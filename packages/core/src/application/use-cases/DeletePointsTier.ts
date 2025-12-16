import { NotFoundError } from "../../domain/errors";
import { PointsTierRepositoryPort } from "../ports";

export interface DeletePointsTierInput {
  id: string;
}

export interface DeletePointsTierOutput {
  success: boolean;
}

export class DeletePointsTier {
  constructor(
    private readonly pointsTierRepository: PointsTierRepositoryPort
  ) {}

  async execute(input: DeletePointsTierInput): Promise<DeletePointsTierOutput> {
    // Check tier exists
    const existingTier = await this.pointsTierRepository.findById(input.id);
    if (!existingTier) {
      throw new NotFoundError("PointsTier", input.id);
    }

    await this.pointsTierRepository.delete(input.id);

    return { success: true };
  }
}
