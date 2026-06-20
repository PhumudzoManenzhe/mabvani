/**
 * Contains PostgreSQL queries related to student profiles.
 * SQL for student profiles must remain inside this repository or migrations.
 */
const { pool, query } = require("../config/database");

const normaliseBoolean = (value) => {
  if (value === "") {
    return null;
  }

  return value;
};

class ProfileRepository {
  async findProfileByUserId(userId) {
    const result = await query(
      `
      SELECT
        u.id,
        u.email,
        u.first_name,
        u.middle_name,
        u.last_name,
        u.role,
        u.is_active,
        u.created_at,
        u.updated_at,

        sp.id AS profile_id,
        sp.id_number,
        sp.passport_number,
        sp.date_of_birth,
        sp.gender,
        sp.citizenship,
        sp.home_language,
        sp.disability_status,
        sp.profile_completion_percentage,
        sp.phone_number,

        sa.address_line1,
        sa.address_line2,
        sa.city,
        sa.province,
        sa.postal_code
      FROM users u
      LEFT JOIN student_profiles sp
        ON sp.user_id = u.id
      LEFT JOIN student_addresses sa
        ON sa.student_id = u.id
      WHERE u.id = $1
      LIMIT 1
      `,
      [userId]
    );

    return result.rows[0] || null;
  }

  async updateProfileByUserId(userId, profile) {
    if (!pool) {
      throw new Error("DATABASE_URL is not configured.");
    }

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      await client.query(
        `
        UPDATE users
        SET
          first_name = $2,
          middle_name = $3,
          last_name = $4,
          updated_at = NOW()
        WHERE id = $1
        `,
        [
          userId,
          profile.first_name || null,
          profile.middle_name || null,
          profile.last_name || null,
        ]
      );

      const profileResult = await client.query(
        `
        UPDATE student_profiles
        SET
          id_number = $2,
          passport_number = $3,
          date_of_birth = $4,
          gender = $5,
          citizenship = $6,
          home_language = $7,
          disability_status = $8,
          profile_completion_percentage = $9,
          phone_number = $10,
          updated_at = NOW()
        WHERE user_id = $1
        RETURNING id
        `,
        [
          userId,
          profile.id_number || null,
          profile.passport_number || null,
          profile.date_of_birth || null,
          profile.gender || null,
          profile.citizenship || null,
          profile.home_language || null,
          normaliseBoolean(profile.disability_status),
          profile.profile_completion_percentage,
          profile.phone_number || 0,
        ]
      );

      let studentProfileId = profileResult.rows[0]?.id;

      if (!studentProfileId) {
        const insertedProfile = await client.query(
          `
          INSERT INTO student_profiles (
            user_id,
            id_number,
            passport_number,
            date_of_birth,
            gender,
            citizenship,
            home_language,
            disability_status,
            profile_completion_percentage,
            phone_number
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING id
          `,
          [
            userId,
            profile.id_number || null,
            profile.passport_number || null,
            profile.date_of_birth || null,
            profile.gender || null,
            profile.citizenship || null,
            profile.home_language || null,
            normaliseBoolean(profile.disability_status),
            profile.profile_completion_percentage,
            profile.phone_number || 0,
          ]
        );

        studentProfileId = insertedProfile.rows[0].id;
      }

      const addressResult = await client.query(
        `
        UPDATE student_addresses
        SET
          address_line1 = $2,
          address_line2 = $3,
          city = $4,
          province = $5,
          postal_code = $6
        WHERE student_id = $1
        `,
        [
          userId,
          profile.address_line1 || "",
          profile.address_line2 || null,
          profile.city || null,
          profile.province || null,
          profile.postal_code || null,
        ]
      );

      if (addressResult.rowCount === 0) {
        await client.query(
          `
          INSERT INTO student_addresses (
            student_id,
            address_line1,
            address_line2,
            city,
            province,
            postal_code
          )
          VALUES ($1, $2, $3, $4, $5, $6)
          `,
          [
            userId,
            profile.address_line1 || "",
            profile.address_line2 || null,
            profile.city || null,
            profile.province || null,
            profile.postal_code || null,
          ]
        );
      }

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = new ProfileRepository();
