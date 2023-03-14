import request from 'supertest';
import ROUTES from '../routes';
import app from '../index';

describe(`GET: ${ROUTES.getImages}`, () => {
  it('returns images', async () => {
    const res = await request(app).get(`${ROUTES.getImages}/?page=1`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(10);
  });

  it('throws error response if no page parameter passed', async () => {
    const res = await request(app).get(`${ROUTES.getImages}`);
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ message: 'Parameter "page" is required' });
  });
});
