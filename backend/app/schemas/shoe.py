from pydantic import BaseModel
from typing import Optional

class ShoeBase(BaseModel):
    brand: str
    model: str
    image_url: Optional[str] = None
    price: Optional[float] = None
    toe_box_width: Optional[int] = None
    midfoot_width: Optional[int] = None
    arch_support: Optional[int] = None
    speed_rating: Optional[int] = None
    explosiveness: Optional[int] = None
    stability_rating: Optional[int] = None
    cushioning: Optional[int] = None
    description: Optional[str] = None

class ShoeCreate(ShoeBase):
    pass

class ShoeUpdate(ShoeBase):
    brand: Optional[str] = None
    model: Optional[str] = None

class Shoe(ShoeBase):
    id: int

    class config:
        from_attributes = True