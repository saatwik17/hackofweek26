export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatarUrl: string;
  country: string;
  category: 'Work' | 'Personal' | 'Family' | 'VIP';
}

const firstNames = ['Aarav', 'Alice', 'Bob', 'Carlos', 'Charlie', 'Diana', 'Ethan', 'Fiona', 'George', 'Hans', 'Ian', 'Julia', 'Kevin', 'Lara', 'Marie', 'Neha', 'Priya', 'Rahul', 'Yuki', 'Zoe', 'Viktor', 'Sarah', 'Omar', 'Mei', 'Liam', 'Emma', 'Noah', 'Olivia', 'William', 'Ava', 'James', 'Isabella', 'Oliver', 'Sophia', 'Benjamin', 'Mia', 'Elijah', 'Charlotte', 'Lucas', 'Amelia', 'Mason', 'Harper', 'Logan', 'Evelyn', 'Alexander', 'Abigail', 'Michael', 'Emily', 'Daniel', 'Elizabeth', 'Henry', 'Mila', 'Jackson', 'Ella', 'Sebastian', 'Avery', 'Aiden', 'Sofia', 'Matthew', 'Camila', 'Samuel', 'Aria', 'David', 'Scarlett', 'Joseph', 'Victoria', 'Carter', 'Madison', 'Owen', 'Luna', 'Wyatt', 'Grace', 'John', 'Chloe', 'Jack', 'Penelope', 'Luke', 'Layla', 'Jayden', 'Riley', 'Dylan', 'Zoey', 'Grayson', 'Nora', 'Levi', 'Lily', 'Isaac', 'Eleanor', 'Gabriel', 'Hannah', 'Julian', 'Lillian', 'Mateo', 'Addison', 'Anthony', 'Aubrey', 'Jaxon', 'Ellie', 'Lincoln', 'Stella', 'Joshua', 'Natalie', 'Christopher', 'Zoe', 'Andrew', 'Leah', 'Theodore', 'Hazel', 'Caleb', 'Violet', 'Ryan', 'Aurora', 'Asher', 'Savannah', 'Nathan', 'Audrey', 'Thomas', 'Brooklyn', 'Leo', 'Bella', 'Isaiah', 'Claire', 'Charles', 'Skylar'];
const lastNames = ['Patel', 'Johnson', 'Smith', 'Silva', 'Brown', 'Prince', 'Hunt', 'Gallagher', 'Costanza', 'Müller', 'Malcolm', 'Child', 'Flynn', 'Croft', 'Dubois', 'Gupta', 'Sharma', 'Desai', 'Tanaka', 'Washburne', 'Krum', 'Connor', 'Little', 'Ling', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy', 'Bailey', 'Rivera', 'Cooper', 'Richardson', 'Cox', 'Howard', 'Ward', 'Torres', 'Peterson', 'Gray', 'Ramirez', 'James', 'Watson', 'Brooks', 'Kelly', 'Sanders', 'Price', 'Bennett', 'Wood', 'Barnes', 'Ross', 'Henderson', 'Coleman', 'Jenkins', 'Perry', 'Powell', 'Long', 'Patterson', 'Hughes', 'Flores', 'Washington', 'Butler', 'Simmons', 'Foster', 'Gonzales', 'Bryant', 'Alexander', 'Russell', 'Griffin', 'Diaz', 'Hayes'];
const countries = ['India', 'USA', 'UK', 'Brazil', 'Germany', 'France', 'Japan', 'Bulgaria', 'China', 'Canada', 'Australia', 'Mexico', 'Spain', 'Italy', 'South Africa', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland'];
const categories: Array<'Work' | 'Personal' | 'Family' | 'VIP'> = ['Work', 'Personal', 'Family', 'VIP'];

// Simple seeded random to keep data consistent across renders
let seed = 12345;
function random() {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function generateContacts(count: number): Contact[] {
  const contacts: Contact[] = [];
  const usedNames = new Set<string>();

  for (let i = 0; i < count; i++) {
    let name = "";
    let firstName = "";
    let lastName = "";
    
    // Ensure unique names
    do {
      firstName = firstNames[Math.floor(random() * firstNames.length)];
      lastName = lastNames[Math.floor(random() * lastNames.length)];
      name = `${firstName} ${lastName}`;
    } while (usedNames.has(name));
    
    usedNames.add(name);

    const country = countries[Math.floor(random() * countries.length)];
    const category = categories[Math.floor(random() * categories.length)];
    
    // Generate a realistic looking phone number
    const countryCode = Math.floor(random() * 90) + 10;
    const part1 = Math.floor(random() * 900) + 100;
    const part2 = Math.floor(random() * 9000) + 1000;
    const phone = `+${countryCode} ${part1} ${part2}`;
    
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@nexus.com`;
    const avatarUrl = `https://i.pravatar.cc/150?u=${name.replace(/\s+/g, '')}`;

    contacts.push({
      id: (i + 1).toString(),
      name,
      phone,
      email,
      avatarUrl,
      country,
      category
    });
  }

  // Sort alphabetically by name for binary search
  return contacts.sort((a, b) => a.name.localeCompare(b.name));
}

// Generate 150 contacts
export const GENERATED_CONTACTS = generateContacts(150);
