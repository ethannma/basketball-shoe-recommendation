# Basketball Shoe Recommendation App

A full-stack website finding the perfect basketball shoes, based on foot type, play style, and real player reviews.

## Features

- Browse a catalog of basketball shoes with detailed specs
- Filter shoes by foot type and play style
- Read and write reviews with ratings
- Community voting on reviews (upvote/downvote)
- Personalized recommendations

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** FastAPI, SQLAlchemy, PostgreSQL
- **Docker:** For local development and deployment

## Getting Started

### Prerequisites

- Node.js & npm
- Python 3.10+
- Docker (optional, for containerized setup)
- PostgreSQL

### Local Development

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Docker

```bash
docker-compose up --build
```

## Folder Structure

```
backend/
  app/
  requirements.txt
frontend/
  src/
  package.json
docker/
docs/
```


## Next Steps & Future Features

- User authentication and profiles
- Track individual review votes per user
- Advanced recommendation engine with LLM API integration
- Admin dashboard for shoe management
- Improved review moderation
- Mobile-friendly UI enhancements
- Integration with external APIs for shoe data
- More filtering and sorting options

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

## License

MIT