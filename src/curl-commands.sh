#
# Add User 
#
curl -X POST http://localhost:3000/api/people \
    -H "Content-Type: application/json"       \
    -d '{"name":      "Fuhrmann",    \
         "givenName": "Patrick",     \
         "birthday":  "1960-09-18"}'
#
# Query User
#  
curl "http://localhost:3000/api/people?name=Patrick" | jq .
