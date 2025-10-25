from sqlalchemy import Column, Integer, String, Float, Text
from app.db.base import Base

class Shoe(Base):
    __tablename__ = "shoes"

    # Unique identifier for the shoe
    id = Column(Integer, primary_key = True, index = True)
    # Brand of shoe e.g. Nike, Adidas
    brand = Column(String, index = True)
    # Model name e.g. Kyrie 7, Harden Vol 5 (could split into "brand, line, model" later on)
    model = Column(String, index = True)

    # Can expand to more images later (more angles), this is just for simple thumbnail
    image_url = Column(String)

    # two sig figs e.g. $12.99 (US)
    price = Column(Float)

    # Description of the shoe dimensions
    toe_box_width = Column(Integer)
    midfoot_width = Column(Integer)
    arch_support = Column(Integer)

    # Playstyle ratings (1-5 scale)
    speed_rating = Column(Integer)
    explosiveness = Column(Integer)
    stability_rating = Column(Integer)
    cushioning = Column(Integer)

    # Textual description of the shoe
    description = Column(Text)