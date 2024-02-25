import { test, request, expect } from "@playwright/test";

test('Get api', async () => {
    // Arrange
    const apiContext = await request.newContext({
        extraHTTPHeaders: {
            accessToken: "",
            hello: "Hello"
        }
    });

    // Action
    const response = await apiContext.get('https://reqres.in/api/users/2');

    // Arrange
    console.log(response.status());

    const body = await response.body();
    const data = JSON.parse(body.toString());
    console.log(data);

    expect(data).toEqual(
        {
            "data": {
                "id": 2,
                "email": "janet.weaver@reqres.in",
                "first_name": "Janet",
                "last_name": "Weaver",
                "avatar": "https://reqres.in/img/faces/2-image.jpg"
            },
            "support": {
                "url": "https://reqres.in/#support-heading",
                "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
            }
        }
    );
});