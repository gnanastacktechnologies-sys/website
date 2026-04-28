import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import Admin from './models/Admin.js';
import SiteSetting from './models/SiteSetting.js';
import Product from './models/Product.js';
import Service from './models/Service.js';
import Project from './models/Project.js';
import connectDB from './config/db.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Admin.deleteMany();
    await SiteSetting.deleteMany();
    await Product.deleteMany();
    await Service.deleteMany();
    await Project.deleteMany();

    console.log('Data Cleared...'.red.inverse);

    // Create Admin
    const admin = await Admin.create({
      name: process.env.ADMIN_NAME || 'Gnana Sekaran',
      email: process.env.ADMIN_EMAIL || 'gnanastacktechnologies@gmail.com',
      password: process.env.ADMIN_PASSWORD || 'Gnanastack2026@',
    });

    console.log('Admin Created...'.green.inverse);

    // Create Site Settings
    await SiteSetting.create({});

    console.log('Site Settings Created...'.green.inverse);

    // Default Products
    const products = [
      {
        title: 'GnanaHRMS',
        slug: 'gnana-hrms',
        shortDescription: 'Modern HRMS for employee management',
        description: 'A modern HRMS solution for employee management, attendance, leave tracking, payroll workflow, HR dashboard, and employee self-service.',
        features: ['Employee Management', 'Attendance Tracking', 'Leave Management', 'Payroll Workflow', 'HR Dashboard'],
        order: 1,
      },
      {
        title: 'GnanaTest Portal',
        slug: 'gnana-test-portal',
        shortDescription: 'Secure online testing platform',
        description: 'A secure online test platform for schools, coaching centers, institutions, and training programs.',
        features: ['Test Creation', 'Student Login', 'Timer-Based Exams', 'Result Management', 'Admin Dashboard'],
        order: 2,
      },
      {
        title: 'GnanaInvite',
        slug: 'gnana-invite',
        shortDescription: 'Premium digital invitation solution',
        description: 'A premium digital invitation website solution for weddings, birthdays, housewarming, business events, and family functions.',
        features: ['Event Website', 'Photo Gallery', 'Google Map Location', 'Countdown Timer', 'RSVP Option'],
        order: 3,
      },
      {
        title: 'Custom MERN Applications',
        slug: 'custom-mern',
        shortDescription: 'Tailored web solutions for business',
        description: 'Custom web applications built using MongoDB, Express.js, React, and Node.js for unique business needs.',
        features: ['Admin Panels', 'Business Dashboards', 'API Development', 'Database Design', 'Responsive UI'],
        order: 4,
      }
    ];
    await Product.insertMany(products);

    // Default Services
    const services = [
      { title: 'MERN Stack Web Applications', order: 1 },
      { title: 'React Frontend Development', order: 2 },
      { title: 'Node.js Backend API Development', order: 3 },
      { title: 'MongoDB Database Design', order: 4 },
      { title: 'Admin Dashboard Development', order: 5 },
      { title: 'Business Automation Solutions', order: 6 },
      { title: 'Product UI/UX Design', order: 7 },
      { title: 'Deployment Support', order: 8 },
    ];
    await Service.insertMany(services);

    // Default Projects
    const projects = [
      { 
        title: 'HRMS Platform', 
        type: 'Enterprise', 
        techStack: ['MERN', 'Tailwind'], 
        description: 'Streamlined employee lifecycle management.', 
        imageUrl: '/images/projects/hrms.png',
        order: 1 
      },
      { 
        title: 'Online Test Portal', 
        type: 'EdTech', 
        techStack: ['React', 'Node.js'], 
        description: 'High-security examination gateway.', 
        imageUrl: '/images/projects/test-portal.png',
        order: 2 
      },
      { 
        title: 'Digital Invitation Website', 
        type: 'Events', 
        techStack: ['React', 'Framer Motion'], 
        description: 'Elegant invitation platforms.', 
        imageUrl: '/images/projects/invitation.png',
        order: 3 
      },
      { 
        title: 'Custom MERN Dashboard', 
        type: 'Business', 
        techStack: ['MERN', 'Chart.js'], 
        description: 'Advanced data management.', 
        imageUrl: '', // placeholder
        order: 4 
      },
    ];
    await Project.insertMany(projects);

    console.log('Sample Data Seeded!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

seedData();
