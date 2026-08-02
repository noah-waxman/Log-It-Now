#!/usr/bin/env bash
set -euo pipefail

# Wrapper around: docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
# Any arguments you pass are forwarded to docker compose up.
# If you pass -d (or --detach), it just gets forwarded too, and since
# up supports -d natively, that runs the stack in the background.

docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build "$@"