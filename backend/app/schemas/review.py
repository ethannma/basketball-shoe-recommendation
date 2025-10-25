from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ReviewBase(BaseModel):
    user_name: str
    foot_type: str
    play_style: str
    overall_rating: int
    comfort_rating: int
    performance_rating: int
    review_text: str

class ReviewCreate(ReviewBase):
    shoe_id: int

class ReviewUpdate(BaseModel):
    user_name: Optional[str] = None
    foot_type: Optional[str] = None
    play_style: Optional[str] = None
    overall_rating: Optional[int] = None
    comfort_rating: Optional[int] = None
    performance_rating: Optional[int] = None
    review_text: Optional[str] = None

class Review(ReviewBase):
    id: int
    shoe_id: int
    created_at: datetime
    upvotes: int
    downvotes: int
    
    class Config:
        from_attributes = True