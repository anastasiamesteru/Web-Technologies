import bcrypt from 'bcrypt';

// Create a new user
export async function createUser(user) {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);  // Hash password
    const userData = {
      ...user,
      password: hashedPassword,
    };

    // Check if a user with the same email already exists
    const duplicateUser = await User.findOne({ where: { email: user.email } });
    if (duplicateUser) {
      throw new Error('User with this email already exists');
    }

    // Create the user in the database
    const newUser = await User.create(userData);
    return newUser;
  } catch (e) {
    console.error("Error during user creation:", e.message);
    throw new Error(e.message);
  }
}

// Get a user by email
export async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found with this email');
    return user;
  } catch (e) {
    console.error("Error during getting user by email:", e.message);
    throw e;
  }
}

// Get a user by email and check password
export async function getUserByEmailAndCheckPassword(email, password) {
  try {
    const user = await getUserByEmail(email);
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) throw new Error('Password does not match');
    return user;
  } catch (e) {
    console.error("Error during password check:", e.message);
    throw e;
  }
}

