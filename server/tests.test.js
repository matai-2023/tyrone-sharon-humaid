/*
 **@vitest-environment jsdom
 */

import { test, expect } from 'vitest'
import { screen } from '@testing-library/dom'
import matchers from '@testing-library/jest-dom/matchers'
import request from 'supertest'
import server from './server'
expect.extend(matchers)

test(`GET '/' Task Planner should be the first heading`, async () => {
  const res = await request(server).get('/')
  document.body.innerHTML = res.text
  const headings = screen.getAllByRole('heading', { level: 1 })
  expect(headings[0].textContent).toMatch(/task planner/i)
})
