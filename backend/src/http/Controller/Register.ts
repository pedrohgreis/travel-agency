import {prisma} from "@/lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { env } from "@/env";
import { hash } from "bcryptjs";

