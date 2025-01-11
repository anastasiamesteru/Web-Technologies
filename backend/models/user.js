import bcrypt from 'bcrypt';

// Create a new user
export async function createUser(user) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  
  const userData = { 
    ...user, 
    password: hashedPassword 
  };

  // Check if a user with the same email already exists
  const duplicateUser = await User.findOne({ where: { email: user.email } });
  if (duplicateUser) throw new Error('User with this email already exists');
  
  // Create the user in the database
  return await User.create(userData);
}

// Get a user by email
export async function getUserByEmail(email) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found with this email');
  
  return user;
}

// Get a user by email and check password
export async function getUserByEmailAndCheckPassword(email, password) {
  try {
    const user = await getUserByEmail(email);

    // Check if the provided password matches the hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Password does not match');

    return user;
  } catch (e) {
    throw e;
  }
}

// Delete a user by ID
export async function deleteUserById(id) {
  const user = await getUserById(id);
  await user.destroy();
}

// Get user by ID
export async function getUserById(id) {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found with this id');
  
  return user;
}
