# Glow Grove Deployment Guide

## Docker Deployment

### Build Image
```bash
docker build -t glow-grove:latest .
```

### Run Container
```bash
docker run -p 80:80 glow-grove:latest
```

## Environment Variables
- `VITE_API_URL` - Backend API URL
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe payment integration

## Production Considerations
- SSL/TLS certificates
- CDN configuration
- Database connections
- Payment gateway setup

TODO: Expand with detailed deployment strategies and cloud configurations.
