from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.models.shoe_model import Shoe as ShoeModel
from app.schemas.shoe import Shoe, ShoeCreate, ShoeUpdate

router = APIRouter()

@router.get("/", response_model=List[Shoe])
def get_shoes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all shoes with pagination"""
    shoes = db.query(ShoeModel).offset(skip).limit(limit).all()
    return shoes

@router.get("/{shoe_id}", response_model=Shoe)
def get_shoe(shoe_id: int, db: Session = Depends(get_db)):
    """Get a specific shoe by ID"""
    shoe = db.query(ShoeModel).filter(ShoeModel.id == shoe_id).first()
    if not shoe:
        raise HTTPException(status_code=404, detail="Shoe not found")
    return shoe

@router.post("/", response_model=Shoe, status_code=201)
def create_shoe(shoe: ShoeCreate, db: Session = Depends(get_db)):
    """Create a new shoe"""
    db_shoe = ShoeModel(**shoe.model_dump())
    db.add(db_shoe)
    db.commit()
    db.refresh(db_shoe)
    return db_shoe

@router.put("/{shoe_id}", response_model=Shoe)
def update_shoe(shoe_id: int, shoe: ShoeUpdate, db: Session = Depends(get_db)):
    """Update an existing shoe"""
    db_shoe = db.query(ShoeModel).filter(ShoeModel.id == shoe_id).first()
    if not db_shoe:
        raise HTTPException(status_code=404, detail="Shoe not found")
    
    # Update only provided fields
    for key, value in shoe.model_dump(exclude_unset=True).items():
        setattr(db_shoe, key, value)
    
    db.commit()
    db.refresh(db_shoe)
    return db_shoe

@router.delete("/{shoe_id}", status_code=204)
def delete_shoe(shoe_id: int, db: Session = Depends(get_db)):
    """Delete a shoe"""
    db_shoe = db.query(ShoeModel).filter(ShoeModel.id == shoe_id).first()
    if not db_shoe:
        raise HTTPException(status_code=404, detail="Shoe not found")
    
    db.delete(db_shoe)
    db.commit()
    return None