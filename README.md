# Basketball Shoe Recommendation System

A full-stack web application that helps basketball players find the perfect shoes based on their foot type, play style, and community reviews.

## Features

- **Shoe Catalog**: Browse basketball shoes with detailed specifications including fit measurements, performance ratings, and pricing
- **Advanced Filtering**: Filter shoes by foot type (wide, narrow, flat, high arch) and play style (explosive, shifty, fast, balanced, power)
- **User Reviews**: Read and write detailed reviews with ratings for overall quality, comfort, and performance
- **Review Voting System**: Upvote/downvote reviews with sorting options (Most Upvoted, Best, Worst, Recent)
- **Responsive UI**: Modern, mobile-friendly interface built with Next.js and Tailwind CSS

## Tech Stack

### Frontend
- **Next.js 16** - React framework with server-side rendering
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React 19** - UI component library

### Backend
- **FastAPI** - High-performance Python web framework
- **SQLAlchemy** - SQL ORM for database operations
- **PostgreSQL** - Relational database
- **Pydantic** - Data validation and settings management
- **Uvicorn** - ASGI server

## Project Structure

```
basketball-shoe-recommendation/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── app/             # Next.js app router pages
│   │   │   ├── catalog/     # Shoe catalog page
│   │   │   ├── shoes/[id]/  # Individual shoe details
│   │   │   └── recommendations/
│   │   ├── components/      # React components
│   │   └── lib/             # API client utilities
│   └── package.json
│
├── backend/                 # FastAPI application
│   ├── app/
│   │   ├── api/endpoints/   # API route handlers
│   │   ├── models/          # SQLAlchemy models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── db/              # Database configuration
│   │   └── main.py          # Application entry point
│   └── requirements.txt
│
└── docker-compose.yml       # Docker orchestration
```

## Getting Started

### Prerequisites
- Python 3.12+
- Node.js 20+
- PostgreSQL

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment and install dependencies:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Set up your database connection in `app/core/config.py` or environment variables

4. Run the development server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Shoes
- `GET /api/shoes` - List all shoes
- `GET /api/shoes/{id}` - Get shoe details
- `POST /api/shoes` - Create a new shoe
- `PUT /api/shoes/{id}` - Update shoe details
- `DELETE /api/shoes/{id}` - Delete a shoe

### Reviews
- `GET /api/reviews/shoe/{shoe_id}` - Get reviews for a specific shoe
- `GET /api/reviews/{id}` - Get a specific review
- `POST /api/reviews` - Create a new review
- `PUT /api/reviews/{id}` - Update a review
- `POST /api/reviews/{id}/upvote` - Upvote a review
- `POST /api/reviews/{id}/downvote` - Downvote a review
- `DELETE /api/reviews/{id}` - Delete a review

## Database Schema

### Shoes Table
- Physical attributes: toe box width, midfoot width, arch support
- Performance ratings: speed, explosiveness, stability, cushioning
- Product info: brand, model, price, image URL

### Reviews Table
- User information: name, foot type, play style
- Ratings: overall, comfort, performance (1-5 scale)
- Review text and timestamp
- Voting metrics: upvotes, downvotes

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

MIT License - see LICENSE file for details
