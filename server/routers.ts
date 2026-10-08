import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { createMediaAsset, listMediaAssets } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";

const mediaUploadInput = z.object({
  kind: z.enum(["gallery", "sermon"]),
  format: z.enum(["image", "video", "audio", "document"]),
  title: z.string().trim().min(1).max(255),
  description: z.string().trim().max(2000).optional(),
  speaker: z.string().trim().max(255).optional(),
  sermonDate: z.string().trim().max(32).optional(),
  fileName: z.string().trim().min(1).max(255),
  mimeType: z.string().trim().min(1).max(128),
  fileSize: z.number().int().positive().max(35 * 1024 * 1024),
  fileData: z.string().min(1),
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  media: router({
    list: publicProcedure
      .input(z.object({ kind: z.enum(["gallery", "sermon"]) }))
      .query(({ input }) => listMediaAssets(input.kind)),
    upload: adminProcedure.input(mediaUploadInput).mutation(async ({ input, ctx }) => {
      const safeFileName = input.fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
      const storage = await storagePut(
        `media/${ctx.user.id}/${input.kind}/${safeFileName}`,
        Buffer.from(input.fileData, "base64"),
        input.mimeType,
      );

      return createMediaAsset({
        kind: input.kind,
        format: input.format,
        title: input.title,
        description: input.description || null,
        speaker: input.speaker || null,
        sermonDate: input.sermonDate || null,
        fileName: input.fileName,
        mimeType: input.mimeType,
        fileSize: input.fileSize,
        storageKey: storage.key,
        storageUrl: storage.url,
        uploadedBy: ctx.user.id,
      });
    }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
