import { Knex } from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  await knex('hr_users').del();

  const passwordHash = await bcrypt.hash('admin123', 10);

  await knex('hr_users').insert([
    {
      email: 'admin@example.com',
      password_hash: passwordHash,
      name: 'Admin User',
    },
  ]);
}
