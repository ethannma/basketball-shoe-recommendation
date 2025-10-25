from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base

class Review(Base):
    __tablename__ = "reviews"
    
    # Unique identifier for the review
    id = Column(Integer, primary_key=True, index=True)
    # Foreign key to the reviewed shoe
    shoe_id = Column(Integer, ForeignKey("shoes.id"))
    # Reviewer's username
    user_name = Column(String)
    
    # User's foot type
    foot_type = Column(String)  # e.g., "wide", "narrow", "flat"
    play_style = Column(String)  # e.g., "explosive", "shifty", "slow"
    
    # Ratings (1-5)
    overall_rating = Column(Integer)
    comfort_rating = Column(Integer)
    performance_rating = Column(Integer)
    
    # Comprehensive review text
    review_text = Column(Text)
    # Date for review
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Links shoes with reviews
    shoe = relationship("Shoe", backref="reviews")