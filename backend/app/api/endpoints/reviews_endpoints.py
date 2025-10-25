from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List

from app.db.session import get_db
from app.models.review_model import Review as ReviewModel
from app.schemas.review import Review, ReviewCreate, ReviewUpdate

router = APIRouter()

@router.get("/shoe/{shoe_id}", response_model=List[Review])
def get_shoe_reviews(
    shoe_id: int, 
    sort_by: str = "top",  # "top", "best", "worst", "recent"
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    """Get reviews for a specific shoe with sorting options"""
    query = db.query(ReviewModel).filter(ReviewModel.shoe_id == shoe_id)
    
    if sort_by == "top":
        # Sort by net votes (upvotes - downvotes)
        query = query.order_by(desc(ReviewModel.upvotes - ReviewModel.downvotes))
    elif sort_by == "best":
        # Sort by highest overall rating
        query = query.order_by(desc(ReviewModel.overall_rating))
    elif sort_by == "worst":
        # Sort by lowest overall rating
        query = query.order_by(ReviewModel.overall_rating)
    elif sort_by == "recent":
        # Sort by newest first
        query = query.order_by(desc(ReviewModel.created_at))
    
    reviews = query.limit(limit).all()
    return reviews

@router.get("/{review_id}", response_model=Review)
def get_review(review_id: int, db: Session = Depends(get_db)):
    """Get a specific review by ID"""
    review = db.query(ReviewModel).filter(ReviewModel.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return review

@router.post("/", response_model=Review, status_code=201)
def create_review(review: ReviewCreate, db: Session = Depends(get_db)):
    """Create a new review"""
    db_review = ReviewModel(**review.model_dump())
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

@router.put("/{review_id}", response_model=Review)
def update_review(review_id: int, review: ReviewUpdate, db: Session = Depends(get_db)):
    """Update an existing review"""
    db_review = db.query(ReviewModel).filter(ReviewModel.id == review_id).first()
    if not db_review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    for key, value in review.model_dump(exclude_unset=True).items():
        setattr(db_review, key, value)
    
    db.commit()
    db.refresh(db_review)
    return db_review

@router.post("/{review_id}/upvote", response_model=Review)
def upvote_review(review_id: int, db: Session = Depends(get_db)):
    """Upvote a review"""
    db_review = db.query(ReviewModel).filter(ReviewModel.id == review_id).first()
    if not db_review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    db_review.upvotes += 1
    db.commit()
    db.refresh(db_review)
    return db_review

@router.post("/{review_id}/downvote", response_model=Review)
def downvote_review(review_id: int, db: Session = Depends(get_db)):
    """Downvote a review"""
    db_review = db.query(ReviewModel).filter(ReviewModel.id == review_id).first()
    if not db_review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    db_review.downvotes += 1
    db.commit()
    db.refresh(db_review)
    return db_review

@router.delete("/{review_id}", status_code=204)
def delete_review(review_id: int, db: Session = Depends(get_db)):
    """Delete a review"""
    db_review = db.query(ReviewModel).filter(ReviewModel.id == review_id).first()
    if not db_review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    db.delete(db_review)
    db.commit()
    return None