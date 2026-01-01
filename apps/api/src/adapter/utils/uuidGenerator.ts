import { randomUUID } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { IdGeneratorInterface } from "src/domain/utils/idGeneratorInterface";


@Injectable()
export class UuidGenerator implements IdGeneratorInterface {
    generate(): string {
        return randomUUID()
    }
}
