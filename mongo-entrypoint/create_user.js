db.createUser(
  {
    user: "tester",
    pwd: "test",
    roles: [
      {
        role: "readWrite",
        db: "party_shopper"
      }
    ]
  }
);
