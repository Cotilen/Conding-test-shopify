const mock= {
    "users":[
        {
            "id":1,
            "user":"Cleiton",
            "role":"admin",
            "password":"password"
        },
        {
            "id":2,
            "user":"Marcello",
            "role":"admin",
            "password":"12345678"
        },
        {
            "id":3,
            "user":"voyant",
            "role":"admin",
            "password":"Vdh_2@24!@#"
        }
    ]
}
export default function getUser(username){

    const data = mock.users.find(user => user.user === username);

    return data;
}