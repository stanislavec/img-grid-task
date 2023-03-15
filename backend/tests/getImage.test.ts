import request from 'supertest';
import ROUTES from '../routes';
import app from '../app';

const API_URL = '/api' + ROUTES.getImages;

describe(`GET: ${ROUTES.getImages}`, () => {
  it('returns images', async () => {
    const res = await request(app).get(`${API_URL}/?page=1`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(10);
  });

  it('throws error response if no page parameter passed', async () => {
    const res = await request(app).get(`${API_URL}`);
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ message: 'Parameter "page" is required' });
  });
  it('throws error response if page parameter is not numeric', async () => {
    const res = await request(app).get(`${API_URL}/?page=test`);
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ message: 'Parameter "page" is not valid' });
  });
});
