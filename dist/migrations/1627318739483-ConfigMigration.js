"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigMigration1627318739483 = void 0;
class ConfigMigration1627318739483 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE public.config (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            index integer NOT NULL,
            label character varying,
            statement character varying,
            CONSTRAINT "PK_d0ee79a681413d50b0a4f98cf7b" PRIMARY KEY (id)
        );
        INSERT INTO public.config (label, statement, index) 
        VALUES 
            ('Total tickets in a sprint', 'SELECT COUNT(DISTINCT label) AS value FROM issue WHERE sprint = $1;', 1),
            ('Total bugs in a sprint', 'SELECT COUNT(DISTINCT label) AS value FROM issue WHERE sprint = $1 AND type=''nBug'';', 2),
            ('Planned tickets in a sprint', 'SELECT COUNT(DISTINCT label) AS value FROM issue WHERE sprint = $1 AND status!=''Done'';', 3),
            ('Completed tickets in a sprint', 'SELECT COUNT(DISTINCT label) AS value FROM issue WHERE sprint = $1 AND status=''Done'';', 4),
            ('Total sprints in a board', 'SELECT COUNT(DISTINCT sprint) AS value FROM sprint WHERE board = $1;', 5),
            ('Total cost of a project', 'SELECT budget FROM budget_report WHERE projectHarverstID = $1;', 5);`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE public.config;`);
    }
}
exports.ConfigMigration1627318739483 = ConfigMigration1627318739483;
//# sourceMappingURL=1627318739483-ConfigMigration.js.map