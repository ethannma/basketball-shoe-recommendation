from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import shoes

app = FastAPI(title="Basketball Shoe Recommendation API")

# Allow frontend to call API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(shoes.router, prefix="/api/shoes", tags=["shoes"])

@app.get("/")
def read_root():
    return {"message": "Basketball Shoe API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}