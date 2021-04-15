import express from "express";
import supertest from "supertest";
import { database } from "../../database";
import { router } from "../pizzas";

describe("pizzas", () => {
    beforeAll(async () => {
        await database.migrate.latest();
    });

    afterAll(async () => {
    await database.destroy();
    });

    describe("get", () => {
        it("should return all pizzas if url is vanilla", async () => {
            const request = supertest(express().use(router));
            const response = await request.get("/");
            expect(response.status).toBe(200);
        });
        it("should return one pizza when id is given in url", async () => {
            const request = supertest(express().use(router));
            const response = await request.get("/1");
            expect(response.status).toBe(200);
        });
    });
    
    describe("post", () => {
        it("should add a new post in db when going in post method", async () => {
            const request = supertest(express().use(express.json()).use(router));
            const response = await request.post("/").send({name: "test"});
            expect(response.status).toBe(200);
        });
        it("should throw an error if param is missing when adding new pizza", async () => {
            const request = supertest(express().use(express.json()).use(router));
            const response = await request.post("/").send({});
            expect(response.status).toBe(500);
        });
        it("should throw an error if name is not a string", async () => {
            const request = supertest(express().use(express.json()).use(router));
            const response1 = await request.post("/").send({name: 10});
            expect(response1.status).toBe(500);
            const response2 = await request.post("/").send({name: true});
            expect(response2.status).toBe(500);
            const response3 = await request.post("/").send({name: 8.7});
            expect(response3.status).toBe(500);
        });
    });

    describe("/delete", () => {
        it("should delete a pizza when id is given in delete method", async () => {
            const request = supertest(express().use(router));
            const response = await request.delete("/1");
            expect(response.status).toBe(200);
        });
    })
});