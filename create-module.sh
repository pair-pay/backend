#!/bin/bash

# Script para generar la estructura completa de un módulo siguiendo la plantilla funcional del módulo 'users'
# Este script crea todos los archivos necesarios para un módulo en NestJS, incluyendo la aplicación, dominio, infraestructura y presentadores.
# También crea los archivos de prueba y documentación necesarios.
# Uso: ./create-module.sh <nombre-modulo>
# Ejemplo: ./create-module.sh user
# Script para generar la estructura completa de un módulo siguiendo la plantilla funcional del módulo 'users'
# Uso: ./create-module.sh <nombre-modulo>

if [ $# -eq 0 ]; then
    echo "Error: Debes proporcionar un nombre para el módulo"
    echo "Uso: ./create-module.sh <nombre-modulo>"
    echo "Ejemplo: ./create-module.sh user"
    exit 1
fi

MODULE_NAME_SINGULAR=$1
if [[ $MODULE_NAME_SINGULAR == *s ]]; then
  MODULE_NAME_PLURAL="$MODULE_NAME_SINGULAR"
else
  MODULE_NAME_PLURAL="${MODULE_NAME_SINGULAR}s"
fi
MODULE_NAME_SINGULAR_CAPITALIZED=$(echo "$MODULE_NAME_SINGULAR" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')
MODULE_NAME_PLURAL_CAPITALIZED=$(echo "$MODULE_NAME_PLURAL" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')
MODULE_PATH="src/$MODULE_NAME_SINGULAR"

# Crear estructura de carpetas
mkdir -p "$MODULE_PATH/application/commands"
mkdir -p "$MODULE_PATH/application/queries"
mkdir -p "$MODULE_PATH/application/event-handlers"
mkdir -p "$MODULE_PATH/application/dtos"
mkdir -p "$MODULE_PATH/application/ports"
mkdir -p "$MODULE_PATH/domain/events"
mkdir -p "$MODULE_PATH/domain/exceptions"
mkdir -p "$MODULE_PATH/domain/factories"
mkdir -p "$MODULE_PATH/domain/primitives"
mkdir -p "$MODULE_PATH/domain/services"
mkdir -p "$MODULE_PATH/domain/value-objects"
mkdir -p "$MODULE_PATH/infrastructure/cache/in-memory/entities"
mkdir -p "$MODULE_PATH/infrastructure/cache/in-memory/mapper"
mkdir -p "$MODULE_PATH/infrastructure/cache/in-memory/repositories"
mkdir -p "$MODULE_PATH/infrastructure/cache/noop/repositories"
mkdir -p "$MODULE_PATH/infrastructure/cache/redis/entities"
mkdir -p "$MODULE_PATH/infrastructure/cache/redis/mapper"
mkdir -p "$MODULE_PATH/infrastructure/cache/redis/repositories"
mkdir -p "$MODULE_PATH/infrastructure/persistance/in-memory/entities"
mkdir -p "$MODULE_PATH/infrastructure/persistance/in-memory/mapper"
mkdir -p "$MODULE_PATH/infrastructure/persistance/in-memory/repositories"
mkdir -p "$MODULE_PATH/infrastructure/persistance/type-orm/entities"
mkdir -p "$MODULE_PATH/infrastructure/persistance/type-orm/mapper"
mkdir -p "$MODULE_PATH/infrastructure/persistance/type-orm/repositories"
mkdir -p "$MODULE_PATH/presenters/http/dto"
mkdir -p "$MODULE_PATH/presenters/http"

# Application Service
cat > "$MODULE_PATH/application/${MODULE_NAME_SINGULAR}.service.ts" << EOF
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class ${MODULE_NAME_SINGULAR_CAPITALIZED}Service {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
}
EOF

# Application Module
cat > "$MODULE_PATH/application/${MODULE_NAME_PLURAL}-application.module.ts" << EOF
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}Service } from './${MODULE_NAME_SINGULAR}.service';

// Import handlers
import { Create${MODULE_NAME_SINGULAR_CAPITALIZED}CommandHandler } from './commands/create-${MODULE_NAME_SINGULAR}.command-handler';
import { Update${MODULE_NAME_SINGULAR_CAPITALIZED}CommandHandler } from './commands/update-${MODULE_NAME_SINGULAR}.command-handler';
import { Delete${MODULE_NAME_SINGULAR_CAPITALIZED}CommandHandler } from './commands/delete-${MODULE_NAME_SINGULAR}.command-handler';
import { GetAll${MODULE_NAME_PLURAL_CAPITALIZED}QueryHandler } from './queries/get-all-${MODULE_NAME_PLURAL}.query-handler';
import { Get${MODULE_NAME_SINGULAR_CAPITALIZED}ByIdQueryHandler } from './queries/get-${MODULE_NAME_SINGULAR}-by-id.query-handler';
import { Get${MODULE_NAME_SINGULAR_CAPITALIZED}ByEmailQueryHandler } from './queries/get-${MODULE_NAME_SINGULAR}-by-email.query-handler';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}CreatedEventHandler } from './event-handlers/${MODULE_NAME_SINGULAR}-created.event-handler';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}UpdatedEventHandler } from './event-handlers/${MODULE_NAME_SINGULAR}-updated.event-handler';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}DeletedEventHandler } from './event-handlers/${MODULE_NAME_SINGULAR}-deleted.event-handler';

const CommandHandlers = [
  Create${MODULE_NAME_SINGULAR_CAPITALIZED}CommandHandler,
  Update${MODULE_NAME_SINGULAR_CAPITALIZED}CommandHandler,
  Delete${MODULE_NAME_SINGULAR_CAPITALIZED}CommandHandler,
];
const QueryHandlers = [
  GetAll${MODULE_NAME_PLURAL_CAPITALIZED}QueryHandler,
  Get${MODULE_NAME_SINGULAR_CAPITALIZED}ByIdQueryHandler,
  Get${MODULE_NAME_SINGULAR_CAPITALIZED}ByEmailQueryHandler,
];
const EventHandlers = [
  ${MODULE_NAME_SINGULAR_CAPITALIZED}CreatedEventHandler,
  ${MODULE_NAME_SINGULAR_CAPITALIZED}UpdatedEventHandler,
  ${MODULE_NAME_SINGULAR_CAPITALIZED}DeletedEventHandler,
];

@Module({
  imports: [CqrsModule],
  providers: [
    ${MODULE_NAME_SINGULAR_CAPITALIZED}Service,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
  exports: [${MODULE_NAME_SINGULAR_CAPITALIZED}Service],
})
export class ${MODULE_NAME_PLURAL_CAPITALIZED}ApplicationModule {}
EOF

# Commands y Handlers
cat > "$MODULE_PATH/application/commands/create-${MODULE_NAME_SINGULAR}.command.ts" << EOF
export class Create${MODULE_NAME_SINGULAR_CAPITALIZED}Command {
  constructor(public readonly data: any) {}
}
EOF
cat > "$MODULE_PATH/application/commands/create-${MODULE_NAME_SINGULAR}.command-handler.ts" << EOF
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository } from '../ports/${MODULE_NAME_SINGULAR}.repository';
import { Logger } from '@nestjs/common';
import { Create${MODULE_NAME_SINGULAR_CAPITALIZED}Command } from './create-${MODULE_NAME_SINGULAR}.command';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED} } from 'src/${MODULE_NAME_SINGULAR}/domain/${MODULE_NAME_SINGULAR}';

@CommandHandler(Create${MODULE_NAME_SINGULAR_CAPITALIZED}Command)
export class Create${MODULE_NAME_SINGULAR_CAPITALIZED}CommandHandler implements ICommandHandler<Create${MODULE_NAME_SINGULAR_CAPITALIZED}Command> {
  private readonly logger = new Logger(Create${MODULE_NAME_SINGULAR_CAPITALIZED}CommandHandler.name);
  constructor(
    private readonly ${MODULE_NAME_SINGULAR}Repository: ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository,
    private readonly eventBus: EventBus,
  ) {}
  async execute(command: Create${MODULE_NAME_SINGULAR_CAPITALIZED}Command): Promise<${MODULE_NAME_SINGULAR_CAPITALIZED}> {
    this.logger.debug('Executing Create${MODULE_NAME_SINGULAR_CAPITALIZED}Command');
    // Implement your creation logic here
    return null;
  }
}
EOF

cat > "$MODULE_PATH/application/commands/update-${MODULE_NAME_SINGULAR}.command.ts" << EOF
export class Update${MODULE_NAME_SINGULAR_CAPITALIZED}Command {
  constructor(public readonly id: string, public readonly data: any) {}
}
EOF
cat > "$MODULE_PATH/application/commands/update-${MODULE_NAME_SINGULAR}.command-handler.ts" << EOF
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository } from '../ports/${MODULE_NAME_SINGULAR}.repository';
import { Logger } from '@nestjs/common';
import { Update${MODULE_NAME_SINGULAR_CAPITALIZED}Command } from './update-${MODULE_NAME_SINGULAR}.command';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED} } from 'src/${MODULE_NAME_SINGULAR}/domain/${MODULE_NAME_SINGULAR}';

@CommandHandler(Update${MODULE_NAME_SINGULAR_CAPITALIZED}Command)
export class Update${MODULE_NAME_SINGULAR_CAPITALIZED}CommandHandler implements ICommandHandler<Update${MODULE_NAME_SINGULAR_CAPITALIZED}Command> {
  private readonly logger = new Logger(Update${MODULE_NAME_SINGULAR_CAPITALIZED}CommandHandler.name);
  constructor(
    private readonly ${MODULE_NAME_SINGULAR}Repository: ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository,
    private readonly eventBus: EventBus,
  ) {}
  async execute(command: Update${MODULE_NAME_SINGULAR_CAPITALIZED}Command): Promise<${MODULE_NAME_SINGULAR_CAPITALIZED}> {
    this.logger.debug('Executing Update${MODULE_NAME_SINGULAR_CAPITALIZED}Command');
    // Implement your update logic here
    return null;
  }
}
EOF

cat > "$MODULE_PATH/application/commands/delete-${MODULE_NAME_SINGULAR}.command.ts" << EOF
export class Delete${MODULE_NAME_SINGULAR_CAPITALIZED}Command {
  constructor(public readonly id: string) {}
}
EOF
cat > "$MODULE_PATH/application/commands/delete-${MODULE_NAME_SINGULAR}.command-handler.ts" << EOF
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository } from '../ports/${MODULE_NAME_SINGULAR}.repository';
import { Logger } from '@nestjs/common';
import { Delete${MODULE_NAME_SINGULAR_CAPITALIZED}Command } from './delete-${MODULE_NAME_SINGULAR}.command';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED} } from 'src/${MODULE_NAME_SINGULAR}/domain/${MODULE_NAME_SINGULAR}';

@CommandHandler(Delete${MODULE_NAME_SINGULAR_CAPITALIZED}Command)
export class Delete${MODULE_NAME_SINGULAR_CAPITALIZED}CommandHandler implements ICommandHandler<Delete${MODULE_NAME_SINGULAR_CAPITALIZED}Command> {
  private readonly logger = new Logger(Delete${MODULE_NAME_SINGULAR_CAPITALIZED}CommandHandler.name);
  constructor(
    private readonly ${MODULE_NAME_SINGULAR}Repository: ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository,
    private readonly eventBus: EventBus,
  ) {}
  async execute(command: Delete${MODULE_NAME_SINGULAR_CAPITALIZED}Command): Promise<${MODULE_NAME_SINGULAR_CAPITALIZED}> {
    this.logger.debug('Executing Delete${MODULE_NAME_SINGULAR_CAPITALIZED}Command');
    // Implement your delete logic here
    return null;
  }
}
EOF

# Queries y Handlers
cat > "$MODULE_PATH/application/queries/get-all-${MODULE_NAME_PLURAL}.query.ts" << EOF
export class GetAll${MODULE_NAME_PLURAL_CAPITALIZED}Query {}
EOF
cat > "$MODULE_PATH/application/queries/get-all-${MODULE_NAME_PLURAL}.query-handler.ts" << EOF
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository } from '../ports/${MODULE_NAME_SINGULAR}.repository';
import { GetAll${MODULE_NAME_PLURAL_CAPITALIZED}Query } from './get-all-${MODULE_NAME_PLURAL}.query';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED} } from 'src/${MODULE_NAME_SINGULAR}/domain/${MODULE_NAME_SINGULAR}';
import { Logger } from '@nestjs/common';

@QueryHandler(GetAll${MODULE_NAME_PLURAL_CAPITALIZED}Query)
export class GetAll${MODULE_NAME_PLURAL_CAPITALIZED}QueryHandler implements IQueryHandler<GetAll${MODULE_NAME_PLURAL_CAPITALIZED}Query> {
  private readonly logger = new Logger(GetAll${MODULE_NAME_PLURAL_CAPITALIZED}QueryHandler.name);
  constructor(private readonly ${MODULE_NAME_SINGULAR}Repository: ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository) {}
  async execute(): Promise<${MODULE_NAME_SINGULAR_CAPITALIZED}[]> {
    this.logger.debug('Executing GetAll${MODULE_NAME_PLURAL_CAPITALIZED}Query');
    // return await this.${MODULE_NAME_SINGULAR}Repository.findAll();
    return [];
  }
}
EOF
cat > "$MODULE_PATH/application/queries/get-${MODULE_NAME_SINGULAR}-by-id.query.ts" << EOF
export class Get${MODULE_NAME_SINGULAR_CAPITALIZED}ByIdQuery {
  constructor(public readonly id: string) {}
}
EOF
cat > "$MODULE_PATH/application/queries/get-${MODULE_NAME_SINGULAR}-by-id.query-handler.ts" << EOF
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository } from '../ports/${MODULE_NAME_SINGULAR}.repository';
import { Get${MODULE_NAME_SINGULAR_CAPITALIZED}ByIdQuery } from './get-${MODULE_NAME_SINGULAR}-by-id.query';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED} } from 'src/${MODULE_NAME_SINGULAR}/domain/${MODULE_NAME_SINGULAR}';
import { Logger } from '@nestjs/common';

@QueryHandler(Get${MODULE_NAME_SINGULAR_CAPITALIZED}ByIdQuery)
export class Get${MODULE_NAME_SINGULAR_CAPITALIZED}ByIdQueryHandler implements IQueryHandler<Get${MODULE_NAME_SINGULAR_CAPITALIZED}ByIdQuery> {
  private readonly logger = new Logger(Get${MODULE_NAME_SINGULAR_CAPITALIZED}ByIdQueryHandler.name);
  constructor(private readonly ${MODULE_NAME_SINGULAR}Repository: ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository) {}
  async execute(query: Get${MODULE_NAME_SINGULAR_CAPITALIZED}ByIdQuery): Promise<${MODULE_NAME_SINGULAR_CAPITALIZED}> {
    this.logger.debug('Executing Get${MODULE_NAME_SINGULAR_CAPITALIZED}ByIdQuery');
    // return await this.${MODULE_NAME_SINGULAR}Repository.findById(query.id);
    return null;
  }
}
EOF
cat > "$MODULE_PATH/application/queries/get-${MODULE_NAME_SINGULAR}-by-email.query.ts" << EOF
export class Get${MODULE_NAME_SINGULAR_CAPITALIZED}ByEmailQuery {
  constructor(public readonly email: string) {}
}
EOF
cat > "$MODULE_PATH/application/queries/get-${MODULE_NAME_SINGULAR}-by-email.query-handler.ts" << EOF
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository } from '../ports/${MODULE_NAME_SINGULAR}.repository';
import { Get${MODULE_NAME_SINGULAR_CAPITALIZED}ByEmailQuery } from './get-${MODULE_NAME_SINGULAR}-by-email.query';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED} } from 'src/${MODULE_NAME_SINGULAR}/domain/${MODULE_NAME_SINGULAR}';
import { Logger } from '@nestjs/common';

@QueryHandler(Get${MODULE_NAME_SINGULAR_CAPITALIZED}ByEmailQuery)
export class Get${MODULE_NAME_SINGULAR_CAPITALIZED}ByEmailQueryHandler implements IQueryHandler<Get${MODULE_NAME_SINGULAR_CAPITALIZED}ByEmailQuery> {
  private readonly logger = new Logger(Get${MODULE_NAME_SINGULAR_CAPITALIZED}ByEmailQueryHandler.name);
  constructor(private readonly ${MODULE_NAME_SINGULAR}Repository: ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository) {}
  async execute(query: Get${MODULE_NAME_SINGULAR_CAPITALIZED}ByEmailQuery): Promise<${MODULE_NAME_SINGULAR_CAPITALIZED}> {
    this.logger.debug('Executing Get${MODULE_NAME_SINGULAR_CAPITALIZED}ByEmailQuery');
    // return await this.${MODULE_NAME_SINGULAR}Repository.findByEmail(query.email);
    return null;
  }
}
EOF

# Event Handlers
cat > "$MODULE_PATH/application/event-handlers/${MODULE_NAME_SINGULAR}-created.event-handler.ts" << EOF
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}CreatedEvent } from '../../domain/events/${MODULE_NAME_SINGULAR}-created.event';

@EventsHandler(${MODULE_NAME_SINGULAR_CAPITALIZED}CreatedEvent)
export class ${MODULE_NAME_SINGULAR_CAPITALIZED}CreatedEventHandler implements IEventHandler<${MODULE_NAME_SINGULAR_CAPITALIZED}CreatedEvent> {
  private readonly logger = new Logger(${MODULE_NAME_SINGULAR_CAPITALIZED}CreatedEventHandler.name);
  async handle(event: ${MODULE_NAME_SINGULAR_CAPITALIZED}CreatedEvent): Promise<void> {
    this.logger.debug(`Handling ${MODULE_NAME_SINGULAR_CAPITALIZED}CreatedEvent for ${MODULE_NAME_SINGULAR}`);
  }
}
EOF
cat > "$MODULE_PATH/application/event-handlers/${MODULE_NAME_SINGULAR}-updated.event-handler.ts" << EOF
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}UpdatedEvent } from '../../domain/events/${MODULE_NAME_SINGULAR}-updated.event';

@EventsHandler(${MODULE_NAME_SINGULAR_CAPITALIZED}UpdatedEvent)
export class ${MODULE_NAME_SINGULAR_CAPITALIZED}UpdatedEventHandler implements IEventHandler<${MODULE_NAME_SINGULAR_CAPITALIZED}UpdatedEvent> {
  private readonly logger = new Logger(${MODULE_NAME_SINGULAR_CAPITALIZED}UpdatedEventHandler.name);
  async handle(event: ${MODULE_NAME_SINGULAR_CAPITALIZED}UpdatedEvent): Promise<void> {
    this.logger.debug(`Handling ${MODULE_NAME_SINGULAR_CAPITALIZED}UpdatedEvent for ${MODULE_NAME_SINGULAR}`);
  }
}
EOF
cat > "$MODULE_PATH/application/event-handlers/${MODULE_NAME_SINGULAR}-deleted.event-handler.ts" << EOF
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}DeletedEvent } from '../../domain/events/${MODULE_NAME_SINGULAR}-deleted.event';

@EventsHandler(${MODULE_NAME_SINGULAR_CAPITALIZED}DeletedEvent)
export class ${MODULE_NAME_SINGULAR_CAPITALIZED}DeletedEventHandler implements IEventHandler<${MODULE_NAME_SINGULAR_CAPITALIZED}DeletedEvent> {
  private readonly logger = new Logger(${MODULE_NAME_SINGULAR_CAPITALIZED}DeletedEventHandler.name);
  async handle(event: ${MODULE_NAME_SINGULAR_CAPITALIZED}DeletedEvent): Promise<void> {
    this.logger.debug(`Handling ${MODULE_NAME_SINGULAR_CAPITALIZED}DeletedEvent for ${MODULE_NAME_SINGULAR}`);
  }
}
EOF

# DTOs
cat > "$MODULE_PATH/application/dtos/create-${MODULE_NAME_SINGULAR}.dto.ts" << EOF
export class Create${MODULE_NAME_SINGULAR_CAPITALIZED}Dto {}
EOF
cat > "$MODULE_PATH/application/dtos/update-${MODULE_NAME_SINGULAR}.dto.ts" << EOF
export class Update${MODULE_NAME_SINGULAR_CAPITALIZED}Dto {}
EOF

# Ports
cat > "$MODULE_PATH/application/ports/${MODULE_NAME_SINGULAR}.repository.ts" << EOF
export abstract class ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository {}
EOF
cat > "$MODULE_PATH/application/ports/${MODULE_NAME_SINGULAR}-cache.repository.ts" << EOF
export abstract class ${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository {}
EOF

# ===== DOMAIN LAYER =====
# Entidad principal
cat > "$MODULE_PATH/domain/${MODULE_NAME_SINGULAR}.ts" << EOF
export class ${MODULE_NAME_SINGULAR_CAPITALIZED} {
  constructor(
    public readonly id: string,
    // Add your domain properties here
  ) {}

  // Add your domain methods here
}
EOF

# Test de la entidad principal
echo "import { ${MODULE_NAME_SINGULAR_CAPITALIZED} } from './${MODULE_NAME_SINGULAR}';

describe('${MODULE_NAME_SINGULAR_CAPITALIZED}', () => {
  it('should create a ${MODULE_NAME_SINGULAR}', () => {
    const ${MODULE_NAME_SINGULAR} = new ${MODULE_NAME_SINGULAR_CAPITALIZED}('test-id');
    expect(${MODULE_NAME_SINGULAR}).toBeDefined();
    expect(${MODULE_NAME_SINGULAR}.id).toBe('test-id');
  });
});" > "$MODULE_PATH/domain/${MODULE_NAME_SINGULAR}.spec.ts"

# Value Objects
cat > "$MODULE_PATH/domain/value-objects/name.value-object.ts" << EOF
export class NameValueObject {
  constructor(public readonly value: string) {
    if (!value || value.length < 2) {
      throw new Error('Invalid name');
    }
  }
}
EOF
cat > "$MODULE_PATH/domain/value-objects/email.value-object.ts" << EOF
export class EmailValueObject {
  constructor(public readonly value: string) {
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) {
      throw new Error('Invalid email');
    }
  }
}
EOF

# Excepciones de dominio
cat > "$MODULE_PATH/domain/exceptions/invalid-${MODULE_NAME_SINGULAR}.exception.ts" << EOF
export class Invalid${MODULE_NAME_SINGULAR_CAPITALIZED}Exception extends Error {
  constructor(message: string) {
    super(message);
  }
}
EOF
cat > "$MODULE_PATH/domain/exceptions/${MODULE_NAME_SINGULAR}-not-found.exception.ts" << EOF
export class ${MODULE_NAME_SINGULAR_CAPITALIZED}NotFoundException extends Error {
  constructor(id: string) {
    super(`${MODULE_NAME_SINGULAR_CAPITALIZED} with id ${id} not found`);
  }
}
EOF

# Factories
cat > "$MODULE_PATH/domain/factories/${MODULE_NAME_SINGULAR}.factory.ts" << EOF
import { ${MODULE_NAME_SINGULAR_CAPITALIZED} } from '../${MODULE_NAME_SINGULAR}';

export class ${MODULE_NAME_SINGULAR_CAPITALIZED}Factory {
  static create(data: any): ${MODULE_NAME_SINGULAR_CAPITALIZED} {
    // Implement your factory logic here
    return new ${MODULE_NAME_SINGULAR_CAPITALIZED}(data.id);
  }
}
EOF
cat > "$MODULE_PATH/domain/factories/${MODULE_NAME_SINGULAR}.factory.spec.ts" << EOF
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}Factory } from './${MODULE_NAME_SINGULAR}.factory';

describe('${MODULE_NAME_SINGULAR_CAPITALIZED}Factory', () => {
  it('should create a ${MODULE_NAME_SINGULAR}', () => {
    const data = { id: 'test-id' };
    const ${MODULE_NAME_SINGULAR} = ${MODULE_NAME_SINGULAR_CAPITALIZED}Factory.create(data);
    expect(${MODULE_NAME_SINGULAR}).toBeDefined();
    expect(${MODULE_NAME_SINGULAR}.id).toBe(data.id);
  });
});
EOF

# Primitives
cat > "$MODULE_PATH/domain/primitives/${MODULE_NAME_SINGULAR}.primitive.ts" << EOF
export interface ${MODULE_NAME_SINGULAR_CAPITALIZED}Primitive {
  id: string;
  // Add your primitive properties here
}
EOF

# Eventos de dominio
cat > "$MODULE_PATH/domain/events/${MODULE_NAME_SINGULAR}-created.event.ts" << EOF
import { ${MODULE_NAME_SINGULAR_CAPITALIZED} } from '../${MODULE_NAME_SINGULAR}';

export class ${MODULE_NAME_SINGULAR_CAPITALIZED}CreatedEvent {
  constructor(public readonly ${MODULE_NAME_SINGULAR}: ${MODULE_NAME_SINGULAR_CAPITALIZED}) {}
}
EOF
cat > "$MODULE_PATH/domain/events/${MODULE_NAME_SINGULAR}-updated.event.ts" << EOF
import { ${MODULE_NAME_SINGULAR_CAPITALIZED} } from '../${MODULE_NAME_SINGULAR}';

export class ${MODULE_NAME_SINGULAR_CAPITALIZED}UpdatedEvent {
  constructor(public readonly ${MODULE_NAME_SINGULAR}: ${MODULE_NAME_SINGULAR_CAPITALIZED}) {}
}
EOF
cat > "$MODULE_PATH/domain/events/${MODULE_NAME_SINGULAR}-deleted.event.ts" << EOF
import { ${MODULE_NAME_SINGULAR_CAPITALIZED} } from '../${MODULE_NAME_SINGULAR}';

export class ${MODULE_NAME_SINGULAR_CAPITALIZED}DeletedEvent {
  constructor(public readonly ${MODULE_NAME_SINGULAR}: ${MODULE_NAME_SINGULAR_CAPITALIZED}) {}
}
EOF

# Domain Module
cat > "$MODULE_PATH/domain/${MODULE_NAME_PLURAL}-domain.module.ts" << EOF
import { Module } from '@nestjs/common';

@Module({})
export class ${MODULE_NAME_PLURAL_CAPITALIZED}DomainModule {}
EOF

# ===== INFRASTRUCTURE LAYER =====
# Persistance In-Memory Entity
cat > "$MODULE_PATH/infrastructure/persistance/in-memory/entities/${MODULE_NAME_SINGULAR}-in-memory.entity.ts" << EOF
export class ${MODULE_NAME_SINGULAR_CAPITALIZED}InMemoryEntity {
  constructor(
    public readonly id: string,
    // Add your properties here
  ) {}
}
EOF

# Persistance In-Memory Mapper
cat > "$MODULE_PATH/infrastructure/persistance/in-memory/mapper/${MODULE_NAME_PLURAL}-in-memory.mapper.ts" << EOF
import { ${MODULE_NAME_SINGULAR_CAPITALIZED} } from 'src/${MODULE_NAME_SINGULAR}/domain/${MODULE_NAME_SINGULAR}';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}InMemoryEntity } from '../entities/${MODULE_NAME_SINGULAR}-in-memory.entity';

export class ${MODULE_NAME_PLURAL_CAPITALIZED}InMemoryMapper {
  static toDomain(entity: ${MODULE_NAME_SINGULAR_CAPITALIZED}InMemoryEntity): ${MODULE_NAME_SINGULAR_CAPITALIZED} {
    return new ${MODULE_NAME_SINGULAR_CAPITALIZED}(entity.id);
  }
  static toPersistence(domain: ${MODULE_NAME_SINGULAR_CAPITALIZED}): ${MODULE_NAME_SINGULAR_CAPITALIZED}InMemoryEntity {
    return new ${MODULE_NAME_SINGULAR_CAPITALIZED}InMemoryEntity(domain.id);
  }
}
EOF

# Persistance In-Memory Repository
cat > "$MODULE_PATH/infrastructure/persistance/in-memory/repositories/${MODULE_NAME_PLURAL}-in-memory.repository.ts" << EOF
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository } from 'src/${MODULE_NAME_SINGULAR}/application/ports/${MODULE_NAME_SINGULAR}.repository';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED} } from 'src/${MODULE_NAME_SINGULAR}/domain/${MODULE_NAME_SINGULAR}';
import { ${MODULE_NAME_PLURAL_CAPITALIZED}InMemoryMapper } from '../mapper/${MODULE_NAME_PLURAL}-in-memory.mapper';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}InMemoryEntity } from '../entities/${MODULE_NAME_SINGULAR}-in-memory.entity';

@Injectable()
export class ${MODULE_NAME_PLURAL_CAPITALIZED}InMemoryRepository implements ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository {
  private readonly logger = new Logger(${MODULE_NAME_PLURAL_CAPITALIZED}InMemoryRepository.name);
  private items: Map<string, ${MODULE_NAME_SINGULAR_CAPITALIZED}InMemoryEntity> = new Map();
  async findAll(): Promise<${MODULE_NAME_SINGULAR_CAPITALIZED}[]> {
    const entities = Array.from(this.items.values());
    return entities.map(${MODULE_NAME_PLURAL_CAPITALIZED}InMemoryMapper.toDomain);
  }
  async findById(id: string): Promise<${MODULE_NAME_SINGULAR_CAPITALIZED}> {
    this.logger.debug(`Finding ${MODULE_NAME_SINGULAR} with id: ${id}`);
    const entity = this.items.get(id);
    if (!entity) throw new NotFoundException(`${MODULE_NAME_SINGULAR_CAPITALIZED} with id ${id} not found`);
    return ${MODULE_NAME_PLURAL_CAPITALIZED}InMemoryMapper.toDomain(entity);
  }
  async save(domain: ${MODULE_NAME_SINGULAR_CAPITALIZED}): Promise<${MODULE_NAME_SINGULAR_CAPITALIZED}> {
    this.logger.debug(`Saving ${MODULE_NAME_SINGULAR}: ${JSON.stringify(domain)}`);
    const entity = ${MODULE_NAME_PLURAL_CAPITALIZED}InMemoryMapper.toPersistence(domain);
    this.items.set(domain.id, entity);
    return domain;
  }
  async update(domain: ${MODULE_NAME_SINGULAR_CAPITALIZED}): Promise<${MODULE_NAME_SINGULAR_CAPITALIZED}> {
    this.logger.debug(`Updating ${MODULE_NAME_SINGULAR}: ${JSON.stringify(domain)}`);
    const entity = ${MODULE_NAME_PLURAL_CAPITALIZED}InMemoryMapper.toPersistence(domain);
    this.items.set(domain.id, entity);
    return domain;
  }
  async delete(id: string): Promise<${MODULE_NAME_SINGULAR_CAPITALIZED}> {
    this.logger.debug(`Deleting ${MODULE_NAME_SINGULAR} with id: ${id}`);
    const entity = this.items.get(id);
    if (!entity) throw new NotFoundException(`${MODULE_NAME_SINGULAR_CAPITALIZED} with id ${id} not found`);
    this.items.delete(id);
    return ${MODULE_NAME_PLURAL_CAPITALIZED}InMemoryMapper.toDomain(entity);
  }
}
EOF

# Persistance In-Memory Module
cat > "$MODULE_PATH/infrastructure/persistance/in-memory/in-memory-persistance.module.ts" << EOF
import { Module } from '@nestjs/common';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository } from 'src/${MODULE_NAME_SINGULAR}/application/ports/${MODULE_NAME_SINGULAR}.repository';
import { ${MODULE_NAME_PLURAL_CAPITALIZED}InMemoryRepository } from './repositories/${MODULE_NAME_PLURAL}-in-memory.repository';

@Module({
  providers: [
    {
      provide: ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository,
      useClass: ${MODULE_NAME_PLURAL_CAPITALIZED}InMemoryRepository,
    },
  ],
  exports: [${MODULE_NAME_SINGULAR_CAPITALIZED}Repository],
})
export class InMemoryPersistanceModule {}
EOF

# Persistance TypeORM Entity
cat > "$MODULE_PATH/infrastructure/persistance/type-orm/entities/${MODULE_NAME_SINGULAR}-type-orm.entity.ts" << EOF
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('${MODULE_NAME_PLURAL}')
export class ${MODULE_NAME_SINGULAR_CAPITALIZED}TypeOrmEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  // Add your columns here
}
EOF

# Persistance TypeORM Mapper
cat > "$MODULE_PATH/infrastructure/persistance/type-orm/mapper/${MODULE_NAME_SINGULAR}-type-orm.mapper.ts" << EOF
import { ${MODULE_NAME_SINGULAR_CAPITALIZED} } from 'src/${MODULE_NAME_SINGULAR}/domain/${MODULE_NAME_SINGULAR}';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}TypeOrmEntity } from '../entities/${MODULE_NAME_SINGULAR}-type-orm.entity';

export class TypeOrm${MODULE_NAME_SINGULAR_CAPITALIZED}Mapper {
  static toDomain(entity: ${MODULE_NAME_SINGULAR_CAPITALIZED}TypeOrmEntity): ${MODULE_NAME_SINGULAR_CAPITALIZED} {
    return new ${MODULE_NAME_SINGULAR_CAPITALIZED}(entity.id);
  }
  static toPersistence(domain: ${MODULE_NAME_SINGULAR_CAPITALIZED}): ${MODULE_NAME_SINGULAR_CAPITALIZED}TypeOrmEntity {
    return { id: domain.id } as ${MODULE_NAME_SINGULAR_CAPITALIZED}TypeOrmEntity;
  }
}
EOF

# Persistance TypeORM Repository
cat > "$MODULE_PATH/infrastructure/persistance/type-orm/repositories/${MODULE_NAME_PLURAL}-type-orm.repository.ts" << EOF
import { Injectable, Logger } from '@nestjs/common';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}TypeOrmEntity } from '../entities/${MODULE_NAME_SINGULAR}-type-orm.entity';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository } from 'src/${MODULE_NAME_SINGULAR}/application/ports/${MODULE_NAME_SINGULAR}.repository';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED} } from 'src/${MODULE_NAME_SINGULAR}/domain/${MODULE_NAME_SINGULAR}';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrm${MODULE_NAME_SINGULAR_CAPITALIZED}Mapper } from '../mapper/${MODULE_NAME_SINGULAR}-type-orm.mapper';

@Injectable()
export class TypeOrm${MODULE_NAME_PLURAL_CAPITALIZED}Repository implements ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository {
  private readonly logger = new Logger(TypeOrm${MODULE_NAME_PLURAL_CAPITALIZED}Repository.name);
  constructor(
    @InjectRepository(${MODULE_NAME_SINGULAR_CAPITALIZED}TypeOrmEntity)
    private readonly repo: Repository<${MODULE_NAME_SINGULAR_CAPITALIZED}TypeOrmEntity>,
  ) {}
  async findAll(): Promise<${MODULE_NAME_SINGULAR_CAPITALIZED}[]> {
    this.logger.debug('Finding all ${MODULE_NAME_PLURAL}');
    const entities = await this.repo.find();
    return entities.map(TypeOrm${MODULE_NAME_SINGULAR_CAPITALIZED}Mapper.toDomain);
  }
  async findById(id: string): Promise<${MODULE_NAME_SINGULAR_CAPITALIZED}> {
    this.logger.debug(`Finding ${MODULE_NAME_SINGULAR} by id: ${id}`);
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? TypeOrm${MODULE_NAME_SINGULAR_CAPITALIZED}Mapper.toDomain(entity) : null;
  }
  async save(domain: ${MODULE_NAME_SINGULAR_CAPITALIZED}): Promise<${MODULE_NAME_SINGULAR_CAPITALIZED}> {
    this.logger.debug(`Saving ${MODULE_NAME_SINGULAR}: ${domain}`);
    const entity = TypeOrm${MODULE_NAME_SINGULAR_CAPITALIZED}Mapper.toPersistence(domain);
    const saved = await this.repo.save(entity);
    return TypeOrm${MODULE_NAME_SINGULAR_CAPITALIZED}Mapper.toDomain(saved);
  }
  async update(domain: ${MODULE_NAME_SINGULAR_CAPITALIZED}): Promise<${MODULE_NAME_SINGULAR_CAPITALIZED}> {
    this.logger.debug(`Updating ${MODULE_NAME_SINGULAR}: ${domain}`);
    const entity = TypeOrm${MODULE_NAME_SINGULAR_CAPITALIZED}Mapper.toPersistence(domain);
    const updated = await this.repo.save(entity);
    return TypeOrm${MODULE_NAME_SINGULAR_CAPITALIZED}Mapper.toDomain(updated);
  }
  async delete(id: string): Promise<${MODULE_NAME_SINGULAR_CAPITALIZED}> {
    this.logger.debug(`Deleting ${MODULE_NAME_SINGULAR} by id: ${id}`);
    const entity = await this.repo.findOne({ where: { id } });
    await this.repo.delete(id);
    return entity ? TypeOrm${MODULE_NAME_SINGULAR_CAPITALIZED}Mapper.toDomain(entity) : null;
  }
}
EOF

# Persistance TypeORM Module
cat > "$MODULE_PATH/infrastructure/persistance/type-orm/type-orm-persistance.module.ts" << EOF
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}TypeOrmEntity } from './entities/${MODULE_NAME_SINGULAR}-type-orm.entity';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository } from 'src/${MODULE_NAME_SINGULAR}/application/ports/${MODULE_NAME_SINGULAR}.repository';
import { TypeOrm${MODULE_NAME_PLURAL_CAPITALIZED}Repository } from './repositories/${MODULE_NAME_PLURAL}-type-orm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([${MODULE_NAME_SINGULAR_CAPITALIZED}TypeOrmEntity])],
  providers: [
    {
      provide: ${MODULE_NAME_SINGULAR_CAPITALIZED}Repository,
      useClass: TypeOrm${MODULE_NAME_PLURAL_CAPITALIZED}Repository,
    },
  ],
  exports: [${MODULE_NAME_SINGULAR_CAPITALIZED}Repository],
})
export class TypeOrmPersistanceModule {}
EOF

# Cache In-Memory Entity
cat > "$MODULE_PATH/infrastructure/cache/in-memory/entities/${MODULE_NAME_SINGULAR}-in-memory-cache.entity.ts" << EOF
export class ${MODULE_NAME_SINGULAR_CAPITALIZED}InMemoryCacheEntity {
  constructor(
    public readonly id: string,
    // Add your properties here
  ) {}
}
EOF

# Cache In-Memory Mapper
cat > "$MODULE_PATH/infrastructure/cache/in-memory/mapper/${MODULE_NAME_SINGULAR}-in-memory-cache.mapper.ts" << EOF
import { ${MODULE_NAME_SINGULAR_CAPITALIZED} } from 'src/${MODULE_NAME_SINGULAR}/domain/${MODULE_NAME_SINGULAR}';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}InMemoryCacheEntity } from '../entities/${MODULE_NAME_SINGULAR}-in-memory-cache.entity';

export class InMemory${MODULE_NAME_SINGULAR_CAPITALIZED}CacheMapper {
  static toDomain(entity: ${MODULE_NAME_SINGULAR_CAPITALIZED}InMemoryCacheEntity): ${MODULE_NAME_SINGULAR_CAPITALIZED} {
    return new ${MODULE_NAME_SINGULAR_CAPITALIZED}(entity.id);
  }
  static toPersistence(domain: ${MODULE_NAME_SINGULAR_CAPITALIZED}): ${MODULE_NAME_SINGULAR_CAPITALIZED}InMemoryCacheEntity {
    return new ${MODULE_NAME_SINGULAR_CAPITALIZED}InMemoryCacheEntity(domain.id);
  }
}
EOF

# Cache In-Memory Repository
cat > "$MODULE_PATH/infrastructure/cache/in-memory/repositories/${MODULE_NAME_PLURAL}-in-memory-cache.repository.ts" << EOF
import { Injectable, Logger } from '@nestjs/common';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository } from 'src/${MODULE_NAME_SINGULAR}/application/ports/${MODULE_NAME_SINGULAR}-cache.repository';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED} } from 'src/${MODULE_NAME_SINGULAR}/domain/${MODULE_NAME_SINGULAR}';
import { InMemory${MODULE_NAME_SINGULAR_CAPITALIZED}CacheMapper } from '../mapper/${MODULE_NAME_SINGULAR}-in-memory-cache.mapper';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}InMemoryCacheEntity } from '../entities/${MODULE_NAME_SINGULAR}-in-memory-cache.entity';

@Injectable()
export class InMemory${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository implements ${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository {
  private readonly logger = new Logger(InMemory${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository.name);
  private cache: Map<string, { data: ${MODULE_NAME_SINGULAR_CAPITALIZED}InMemoryCacheEntity; ttl: number }> = new Map();
  public async get(key: string): Promise<${MODULE_NAME_SINGULAR_CAPITALIZED} | null> {
    this.logger.log(`Getting ${MODULE_NAME_SINGULAR} from cache: ${key}`);
    const cached = this.cache.get(key);
    if (!cached) return null;
    if (Date.now() > cached.ttl) {
      this.cache.delete(key);
      return null;
    }
    return InMemory${MODULE_NAME_SINGULAR_CAPITALIZED}CacheMapper.toDomain(cached.data);
  }
  public async set(key: string, value: ${MODULE_NAME_SINGULAR_CAPITALIZED}, ttl?: number): Promise<void> {
    this.logger.log(`Setting ${MODULE_NAME_SINGULAR} in cache: ${key}`);
    const ttlValue = ttl || 3600;
    const ttlMs = Date.now() + (ttlValue * 1000);
    const entity = InMemory${MODULE_NAME_SINGULAR_CAPITALIZED}CacheMapper.toPersistence(value);
    this.cache.set(key, { data: entity, ttl: ttlMs });
  }
  public async delete(key: string): Promise<void> {
    this.logger.log(`Deleting ${MODULE_NAME_SINGULAR} from cache: ${key}`);
    this.cache.delete(key);
  }
  public async clear(): Promise<void> {
    this.logger.log('Clearing all cached ${MODULE_NAME_PLURAL}');
    this.cache.clear();
  }
}
EOF

# Cache In-Memory Module
cat > "$MODULE_PATH/infrastructure/cache/in-memory/in-memory-cache.module.ts" << EOF
import { Module } from '@nestjs/common';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository } from 'src/${MODULE_NAME_SINGULAR}/application/ports/${MODULE_NAME_SINGULAR}-cache.repository';
import { InMemory${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository } from './repositories/${MODULE_NAME_PLURAL}-in-memory-cache.repository';

@Module({
  providers: [
    {
      provide: ${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository,
      useClass: InMemory${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository,
    },
  ],
  exports: [${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository],
})
export class ${MODULE_NAME_PLURAL_CAPITALIZED}InMemoryCacheModule {}
EOF

# Cache Noop Repository
cat > "$MODULE_PATH/infrastructure/cache/noop/repositories/${MODULE_NAME_PLURAL}-noop-cache.repository.ts" << EOF
import { Injectable, Logger } from '@nestjs/common';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository } from 'src/${MODULE_NAME_SINGULAR}/application/ports/${MODULE_NAME_SINGULAR}-cache.repository';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED} } from 'src/${MODULE_NAME_SINGULAR}/domain/${MODULE_NAME_SINGULAR}';

@Injectable()
export class Noop${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository implements ${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository {
  private readonly logger = new Logger(Noop${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository.name);
  public async get(key: string): Promise<${MODULE_NAME_SINGULAR_CAPITALIZED} | null> {
    this.logger.debug(`No-op get for key: ${key}`);
    return null;
  }
  public async set(key: string, value: ${MODULE_NAME_SINGULAR_CAPITALIZED}, ttl?: number): Promise<void> {
    this.logger.debug(`No-op set for key: ${key}`);
  }
  public async delete(key: string): Promise<void> {
    this.logger.debug(`No-op delete for key: ${key}`);
  }
  public async clear(): Promise<void> {
    this.logger.debug('No-op clear');
  }
}
EOF

# Cache Noop Module
cat > "$MODULE_PATH/infrastructure/cache/noop/noop-cache.module.ts" << EOF
import { Module } from '@nestjs/common';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository } from 'src/${MODULE_NAME_SINGULAR}/application/ports/${MODULE_NAME_SINGULAR}-cache.repository';
import { Noop${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository } from './repositories/${MODULE_NAME_PLURAL}-noop-cache.repository';

@Module({
  providers: [
    {
      provide: ${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository,
      useClass: Noop${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository,
    },
  ],
  exports: [${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository],
})
export class ${MODULE_NAME_PLURAL_CAPITALIZED}NoopCacheModule {}
EOF 

# Cache Redis Entity
cat > "$MODULE_PATH/infrastructure/cache/redis/entities/${MODULE_NAME_SINGULAR}-cache.entity.ts" << EOF
export class ${MODULE_NAME_SINGULAR_CAPITALIZED}RedisCacheEntity {
  constructor(
    public readonly id: string,
    // Add your properties here
  ) {}
}
EOF

# Cache Redis Mapper
cat > "$MODULE_PATH/infrastructure/cache/redis/mapper/${MODULE_NAME_SINGULAR}-cache.mapper.ts" << EOF
import { ${MODULE_NAME_SINGULAR_CAPITALIZED} } from 'src/${MODULE_NAME_SINGULAR}/domain/${MODULE_NAME_SINGULAR}';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}RedisCacheEntity } from '../entities/${MODULE_NAME_SINGULAR}-cache.entity';

export class ${MODULE_NAME_SINGULAR_CAPITALIZED}RedisCacheMapper {
  static toDomain(entity: ${MODULE_NAME_SINGULAR_CAPITALIZED}RedisCacheEntity): ${MODULE_NAME_SINGULAR_CAPITALIZED} {
    return new ${MODULE_NAME_SINGULAR_CAPITALIZED}(entity.id);
  }
  static toPersistence(domain: ${MODULE_NAME_SINGULAR_CAPITALIZED}): ${MODULE_NAME_SINGULAR_CAPITALIZED}RedisCacheEntity {
    return new ${MODULE_NAME_SINGULAR_CAPITALIZED}RedisCacheEntity(domain.id);
  }
}
EOF

# Cache Redis Repository
cat > "$MODULE_PATH/infrastructure/cache/redis/repositories/${MODULE_NAME_PLURAL}-cache.repository.ts" << EOF
import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from 'src/shared/infrastructure/redis/provider/redis.provider';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository } from 'src/${MODULE_NAME_SINGULAR}/application/ports/${MODULE_NAME_SINGULAR}-cache.repository';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED} } from 'src/${MODULE_NAME_SINGULAR}/domain/${MODULE_NAME_SINGULAR}';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}RedisCacheMapper } from '../mapper/${MODULE_NAME_SINGULAR}-cache.mapper';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}RedisCacheEntity } from '../entities/${MODULE_NAME_SINGULAR}-cache.entity';

@Injectable()
export class ${MODULE_NAME_SINGULAR_CAPITALIZED}RedisCacheRepository implements ${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository {
  private readonly logger = new Logger(${MODULE_NAME_SINGULAR_CAPITALIZED}RedisCacheRepository.name);
  private readonly ttl: number;
  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {
    this.ttl = parseInt(process.env.REDIS_TTL) || 3600;
  }
  public async get(key: string): Promise<${MODULE_NAME_SINGULAR_CAPITALIZED} | null> {
    this.logger.log(`Getting ${MODULE_NAME_SINGULAR} from cache: ${key}`);
    const data = await this.redisClient.get(key);
    if (!data) return null;
    return ${MODULE_NAME_SINGULAR_CAPITALIZED}RedisCacheMapper.toDomain(JSON.parse(data));
  }
  public async set(key: string, value: ${MODULE_NAME_SINGULAR_CAPITALIZED}, ttl?: number): Promise<void> {
    this.logger.log(`Setting ${MODULE_NAME_SINGULAR} in cache: ${key}`);
    const ttlValue = ttl || this.ttl;
    await this.redisClient.set(key, JSON.stringify(value), 'EX', ttlValue);
  }
  public async delete(key: string): Promise<void> {
    this.logger.log(`Deleting ${MODULE_NAME_SINGULAR} from cache: ${key}`);
    await this.redisClient.del(key);
  }
  public async clear(): Promise<void> {
    this.logger.log('Clearing all cached ${MODULE_NAME_PLURAL}');
    await this.redisClient.flushdb();
  }
}
EOF

# Cache Redis Module
cat > "$MODULE_PATH/infrastructure/cache/redis/redis-cache.module.ts" << EOF
import { Module } from '@nestjs/common';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository } from 'src/${MODULE_NAME_SINGULAR}/application/ports/${MODULE_NAME_SINGULAR}-cache.repository';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}RedisCacheRepository } from './repositories/${MODULE_NAME_PLURAL}-cache.repository';

@Module({
  providers: [
    {
      provide: ${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository,
      useClass: ${MODULE_NAME_SINGULAR_CAPITALIZED}RedisCacheRepository,
    },
  ],
  exports: [${MODULE_NAME_SINGULAR_CAPITALIZED}CacheRepository],
})
export class ${MODULE_NAME_PLURAL_CAPITALIZED}RedisCacheModule {}
EOF

# Infrastructure Main Module
cat > "$MODULE_PATH/infrastructure/${MODULE_NAME_PLURAL}-infrastructure.module.ts" << EOF
import { Module } from '@nestjs/common';
import { ${MODULE_NAME_PLURAL_CAPITALIZED}InMemoryCacheModule } from './cache/in-memory/in-memory-cache.module';
import { ${MODULE_NAME_PLURAL_CAPITALIZED}NoopCacheModule } from './cache/noop/noop-cache.module';
import { ${MODULE_NAME_PLURAL_CAPITALIZED}RedisCacheModule } from './cache/redis/redis-cache.module';

@Module({})
export class ${MODULE_NAME_PLURAL_CAPITALIZED}InfrastructureModule {}
EOF

# ===== MAIN MODULE =====
cat > "$MODULE_PATH/${MODULE_NAME_PLURAL}.module.ts" << EOF
import { Module } from '@nestjs/common';
import { ${MODULE_NAME_PLURAL_CAPITALIZED}ApplicationModule } from './application/${MODULE_NAME_PLURAL}-application.module';
import { ${MODULE_NAME_PLURAL_CAPITALIZED}DomainModule } from './domain/${MODULE_NAME_PLURAL}-domain.module';
import { ${MODULE_NAME_PLURAL_CAPITALIZED}InfrastructureModule } from './infrastructure/${MODULE_NAME_PLURAL}-infrastructure.module';
import { ${MODULE_NAME_PLURAL_CAPITALIZED}Controller } from './presenters/http/${MODULE_NAME_PLURAL}.controller';

@Module({
  imports: [
    ${MODULE_NAME_PLURAL_CAPITALIZED}ApplicationModule,
    ${MODULE_NAME_PLURAL_CAPITALIZED}DomainModule,
    ${MODULE_NAME_PLURAL_CAPITALIZED}InfrastructureModule,
  ],
  controllers: [${MODULE_NAME_PLURAL_CAPITALIZED}Controller],
  exports: [${MODULE_NAME_PLURAL_CAPITALIZED}ApplicationModule],
})
export class ${MODULE_NAME_PLURAL_CAPITALIZED}Module {}
EOF

# ===== PRESENTERS LAYER =====
# Controller
cat > "$MODULE_PATH/presenters/http/${MODULE_NAME_PLURAL}.controller.ts" << EOF
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}Service } from '../../application/${MODULE_NAME_SINGULAR}.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('${MODULE_NAME_PLURAL}')
@Controller('api/v1/${MODULE_NAME_PLURAL}')
export class ${MODULE_NAME_PLURAL_CAPITALIZED}Controller {
  constructor(private readonly ${MODULE_NAME_SINGULAR}Service: ${MODULE_NAME_SINGULAR_CAPITALIZED}Service) {}

  @Get()
  @ApiOperation({ summary: 'Get all ${MODULE_NAME_PLURAL}' })
  @ApiResponse({ status: 200, type: [UserResponseDto] })
  async getAll() {
    // Implement your get all logic
    return [];
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ${MODULE_NAME_SINGULAR} by ID' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async getById(@Param('id') id: string) {
    // Implement your get by id logic
    return {};
  }

  @Post()
  @ApiOperation({ summary: 'Create a new ${MODULE_NAME_SINGULAR}' })
  @ApiResponse({ status: 201, type: UserResponseDto })
  async create(@Body() createDto: CreateUserDto) {
    // Implement your create logic
    return {};
  }

  @Put()
  @ApiOperation({ summary: 'Update a ${MODULE_NAME_SINGULAR}' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async update(@Body() updateDto: UpdateUserDto) {
    // Implement your update logic
    return {};
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a ${MODULE_NAME_SINGULAR}' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async delete(@Body() deleteDto: DeleteUserDto) {
    // Implement your delete logic
    return {};
  }
}
EOF

# Controller Spec
cat > "$MODULE_PATH/presenters/http/${MODULE_NAME_PLURAL}.controller.spec.ts" << EOF
import { Test, TestingModule } from '@nestjs/testing';
import { ${MODULE_NAME_PLURAL_CAPITALIZED}Controller } from './${MODULE_NAME_PLURAL}.controller';
import { ${MODULE_NAME_SINGULAR_CAPITALIZED}Service } from '../../application/${MODULE_NAME_SINGULAR}.service';

describe('${MODULE_NAME_PLURAL_CAPITALIZED}Controller', () => {
  let controller: ${MODULE_NAME_PLURAL_CAPITALIZED}Controller;
  let service: ${MODULE_NAME_SINGULAR_CAPITALIZED}Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [${MODULE_NAME_PLURAL_CAPITALIZED}Controller],
      providers: [
        {
          provide: ${MODULE_NAME_SINGULAR_CAPITALIZED}Service,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<${MODULE_NAME_PLURAL_CAPITALIZED}Controller>(${MODULE_NAME_PLURAL_CAPITALIZED}Controller);
    service = module.get<${MODULE_NAME_SINGULAR_CAPITALIZED}Service>(${MODULE_NAME_SINGULAR_CAPITALIZED}Service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
EOF

# DTOs de presentación
cat > "$MODULE_PATH/presenters/http/dto/create-${MODULE_NAME_SINGULAR}.dto.ts" << EOF
import { ApiProperty } from '@nestjs/swagger';

export class Create${MODULE_NAME_SINGULAR_CAPITALIZED}Dto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
}
EOF

cat > "$MODULE_PATH/presenters/http/dto/update-${MODULE_NAME_SINGULAR}.dto.ts" << EOF
import { ApiProperty } from '@nestjs/swagger';

export class Update${MODULE_NAME_SINGULAR_CAPITALIZED}Dto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  name?: string;
}
EOF

cat > "$MODULE_PATH/presenters/http/dto/delete-${MODULE_NAME_SINGULAR}.dto.ts" << EOF
import { ApiProperty } from '@nestjs/swagger';

export class Delete${MODULE_NAME_SINGULAR_CAPITALIZED}Dto {
  @ApiProperty()
  id: string;
}
EOF

cat > "$MODULE_PATH/presenters/http/dto/user-response.dto.ts" << EOF
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
}
EOF# Corrección de logs con interpolación en event-handlers y repositorios
sed -i '' "s/this\.logger\.debug(\`\(.*\)';/this.logger.debug(`\1`);/g" "$0"
sed -i '' "s/this\.logger\.log(\`\(.*\)';/this.logger.log(`\1`);/g" "$0"

