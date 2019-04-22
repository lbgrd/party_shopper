#!/usr/bin/env bash
echo "Creating mongo users..."
mongo admin --host localhost -u root -p example --eval "db.createUser({user: 'tester', pwd: 'test', roles: [{role: 'readWrite', db: 'party_shopper'}]}); db.createUser({user: 'admin', pwd: 'pass', roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]});"
echo "Mongo users created."
