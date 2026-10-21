import express from 'express';
import httpStatus from 'http-status';
import * as service from '../services-$id/exam-service.js';
import { apiResponse } from '../mappers-$id/exam-api-response.js';

const router = express.Router();

// R #1: list; summary DTO + pagination
router.get('/', async (req, res) => {
  const viewType = req.query.view ?? 'summary';
  const objects = await service.getAllObjects(req.pagination, viewType);
  return apiResponse(res, objects, req.pagination);
});

// R #2: detail by primary key
router.get('/:id', async (req, res) => {
  const object = await service.getObject(req.params.id, req.query.view ?? 'full');
  return apiResponse(res, object);
});

// C: create; status follows the exam specification (usually 201)
router.post('/', async (req, res) => {
  const result = await service.createObject(req.body);
  return apiResponse(res, result, null, httpStatus.CREATED);
});

// U: pass both route id and request body to the existing service method
router.put('/:id', async (req, res) => {
  const result = await service.updateObject(req.params.id, req.body);
  return apiResponse(res, result);
});

// D: 204 has no response body
router.delete('/:id', async (req, res) => {
  await service.removeObject(req.params.id);
  return apiResponse(res, null, null, httpStatus.NO_CONTENT);
});

export default router;
