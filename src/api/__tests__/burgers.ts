import express from "express";
import supertest from "supertest";
import { database } from "../../database";
import { router } from "../burgers";

describe("burgers", () => {
    beforeAll(async () => {
        await database.migrate.latest();
    });

    afterAll(async () => {
    await database.destroy();
    });
    describe("get", () => {
        it("should return all burgers when url is vanilla", async () => {
        const request = supertest(express().use(router));
        const response = await request.get("/");
        expect(response.status).toBe(200);
        });
    
        it("should return one burger when its id is given in url", async () => {
        const request = supertest(express().use(router));
        const response = await request.get("/1");
        expect(response.status).toBe(200);
        });
    });

    describe("post", () => {
        it("should add a new burger in db when going in post method", async () => {
            const request = supertest(express().use(express.json()).use(router));
            const response = await request.post("/").send({name: "test", price: 10});
            expect(response.status).toBe(200);
        });
        it("should throw an error if param is missing when adding new burger", async () => {
            const request = supertest(express().use(express.json()).use(router));
            const response1 = await request.post("/").send({name: "test"});
            expect(response1.status).toBe(500);
            const response2 = await request.post("/").send({price: 10});
            expect(response2.status).toBe(500);
        });
        it("should throw an error if name is not a string", async () => {
            const request = supertest(express().use(express.json()).use(router));
            const response1 = await request.post("/").send({name: 10, price: 10});
            expect(response1.status).toBe(500);
            const response2 = await request.post("/").send({name: true, price: 10});
            expect(response2.status).toBe(500);
            const response3 = await request.post("/").send({name: 8.7, price: 10});
            expect(response3.status).toBe(500);
        });
        it("should throw an error if price is not a number", async () => {
            const request = supertest(express().use(express.json()).use(router));
            const response1 = await request.post("/").send({name: "test", price: "test"});
            expect(response1.status).toBe(500);
            const response2 = await request.post("/").send({name: "test", price: true});
            expect(response2.status).toBe(500);
            const response3 = await request.post("/").send({name: "test", price: 8.7});
            expect(response3.status).toBe(500);
        });
    });

    describe("delete", () => {
        it("should delete a burger when id is given in delete method", async () => {
            const request = supertest(express().use(router));
            const response = await request.delete("/1");
            expect(response.status).toBe(200);
        });
    });

});
