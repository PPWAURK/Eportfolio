#!/bin/bash
set -e

DOMAIN="shihongwang.fr.eu.org"
EMAIL="wangshihong2333@gmail.com"

echo "=== Portfolio Deployment Script ==="
echo "Domain: $DOMAIN"
echo ""

# Step 1: Create data directories
echo "[1/5] Creating data directories..."
mkdir -p data/ssl data/certbot/conf

# Step 2: Start HTTP-only (for Let's Encrypt challenge)
echo "[2/5] Starting HTTP server for SSL certificate..."
docker compose up -d app nginx

# Step 3: Obtain SSL certificate
echo "[3/5] Obtaining Let's Encrypt certificate..."
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  -d "$DOMAIN"

# Step 4: Copy certs to SSL directory
echo "[4/5] Setting up SSL certificates..."
cp data/certbot/conf/live/$DOMAIN/fullchain.pem data/ssl/
cp data/certbot/conf/live/$DOMAIN/privkey.pem data/ssl/

# Step 5: Switch to SSL config
echo "[5/5] Switching to HTTPS configuration..."
# Temporarily swap the nginx config
cp nginx/portfolio.conf nginx/portfolio.conf.bak
cp nginx/portfolio.ssl.conf nginx/portfolio.conf

docker compose restart nginx

echo ""
echo "=== Deployment Complete ==="
echo "Your portfolio is live at: https://$DOMAIN"
echo ""
echo "To restore HTTP-only config:"
echo "  cp nginx/portfolio.conf.bak nginx/portfolio.conf"
echo "  docker compose restart nginx"
