#!/bin/bash
set -e

docker cp ./sql/update_book_img_id.sql postgres:/docker-entrypoint-initdb.d/update_book_img_id.sql
docker exec -it postgres psql -U postgres -d postgres -f docker-entrypoint-initdb.d/update_book_img_id.sql