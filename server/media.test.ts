import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type TestUser = NonNullable<TrpcContext["user"]>;

function createContext(role: TestUser["role"] = "user"): TrpcContext {
  const user: TestUser = {
    id: 7,
    openId: `media-test-${role}`,
    email: "media-test@example.com",
    name: "Media Test User",
    loginMethod: "test",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => undefined,
    } as TrpcContext["res"],
  };
}

describe("media library", () => {
  it("exposes a public gallery listing contract", async () => {
    const caller = appRouter.createCaller({ ...createContext(), user: null });
    const result = await caller.media.list({ kind: "gallery" });

    expect(Array.isArray(result)).toBe(true);
  });

  it("rejects uploads from non-admin accounts", async () => {
    const caller = appRouter.createCaller(createContext("user"));

    await expect(
      caller.media.upload({
        kind: "gallery",
        format: "image",
        title: "Not allowed",
        fileName: "photo.jpg",
        mimeType: "image/jpeg",
        fileSize: 1024,
        fileData: "ZmFrZQ==",
      }),
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
