import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

let createSpecificationUseCase: CreateSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Specification", () => {
	beforeEach(() => {
		specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
		createSpecificationUseCase = new CreateSpecificationUseCase(
			specificationsRepositoryInMemory
		);
	});

	it("should be able to create a new specification", async () => {
		const specification = await createSpecificationUseCase.execute({
			name: "test specification",
			description: "test description specification",
		});

		expect(specification).toHaveProperty("id");
	});
});
