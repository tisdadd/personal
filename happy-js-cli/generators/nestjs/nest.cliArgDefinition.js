const definition = {
  '--project-type': {
    description: 'NestJS',
  },
  '--api-description': {
    description: 'API Description (only for NestJS)',
    type: String,
    normalizedName: 'apiDescription',
    default: 'A Proof of Concept',
    projectTypes: ['NestJS'],
  },
  '--api-tag': {
    description: 'API Tag (only for NestJS)',
    type: String,
    normalizedName: 'apiTag',
    default: 'POC',
    projectTypes: ['NestJS'],
  },
  '--api-name': {
    description: 'API Name (only for NestJS)',
    type: String,
    normalizedName: 'apiName',
    default: 'POC-API',
    projectTypes: ['NestJS'],
  },
};

export default definition;
