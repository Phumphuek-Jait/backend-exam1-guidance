import * as repo from '../repositories-$id/exam-repository.js';
import mapper from '../mappers-$id/exam-entity-dto-mapper.js'; //remove this if no mapper (dto)
import { AppError } from '../middlewares-$id/exam-error-handler.js';

// Method names match service.js in the supplied midterm template.
export async function getObject(id, viewType = 'full') {
  const entity = await repo.findOne(id);
  if (!entity) throw new AppError('Record not found', 404, 'NOT_FOUND');
  return mapper.map(entity, viewType);
  // if no mapper just
  // return entity
  // instead
}

export async function getAllObjects(pagination = null, viewType = 'summary') {
  const entities = await repo.findAll(pagination);
  return mapper.maps(entities, viewType);
  // if no mapper just
  // return entities
  // instead
}

export async function createObject(data) {
  const entity = await repo.create(data);
  if (!entity) throw new AppError('Duplicate or invalid record', 409, 'CONFLICT');
  return entity;
}

export async function updateObject(id, data) {
  const entity = await repo.update(id, data);
  if (!entity) throw new AppError('Record not found', 404, 'NOT_FOUND');
  return entity;
}

export async function removeObject(id) {
  const removed = await repo.remove(id);
  if (!removed) throw new AppError('Record not found', 404, 'NOT_FOUND');
  return removed;
}
