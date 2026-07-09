import { JDFormInput } from '@/lib/types/jd';

export interface JDTemplate {
  id: string;
  name: string;
  department: string;
  blurb: string;
  defaults: Pick<
    JDFormInput,
    'position' | 'department' | 'experience' | 'employmentType' | 'qualifications' | 'skills' | 'responsibilities'
  >;
}

export const JD_TEMPLATES: JDTemplate[] = [
  {
    id: 'software-engineer',
    name: 'Software Engineer',
    department: 'Software Development',
    blurb: 'Product engineering role for building and maintaining Hexagon software platforms.',
    defaults: {
      position: 'Software Engineer',
      department: 'Software Development',
      experience: '1-3 Years',
      employmentType: 'Full-time',
      qualifications: ['BE', 'BTech', 'MCA'],
      skills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'REST APIs'],
      responsibilities: [
        'Design, build, and maintain scalable software features',
        'Write clean, tested, and well-documented code',
        'Collaborate with product and QA to ship reliable releases',
        'Participate in code reviews and technical design discussions',
      ],
    },
  },
  {
    id: 'site-engineer',
    name: 'Site Engineer',
    department: 'Engineering',
    blurb: 'On-site technical role overseeing installation, commissioning, and field operations.',
    defaults: {
      position: 'Site Engineer',
      department: 'Engineering',
      experience: '1-3 Years',
      employmentType: 'Full-time',
      qualifications: ['Diploma', 'BE', 'BTech'],
      skills: ['AutoCAD', 'Site Supervision', 'HSE', 'Project Scheduling'],
      responsibilities: [
        'Supervise on-site installation and commissioning activities',
        'Coordinate with contractors and vendors on project timelines',
        'Ensure compliance with safety and quality standards',
        'Prepare daily progress and inspection reports',
      ],
    },
  },
  {
    id: 'service-engineer',
    name: 'Service Engineer',
    department: 'Services',
    blurb: 'Customer-facing role for maintenance, troubleshooting, and after-sales support.',
    defaults: {
      position: 'Service Engineer',
      department: 'Services',
      experience: '1-3 Years',
      employmentType: 'Full-time',
      qualifications: ['Diploma', 'BE', 'BTech'],
      skills: ['Preventive Maintenance', 'Troubleshooting', 'Customer Support', 'Asset Lifecycle'],
      responsibilities: [
        'Perform preventive and corrective maintenance for customer equipment',
        'Diagnose and resolve technical issues on-site and remotely',
        'Maintain accurate service records and escalation logs',
        'Build strong working relationships with customer stakeholders',
      ],
    },
  },
  {
    id: 'qa-engineer',
    name: 'QA Engineer',
    department: 'Software Development',
    blurb: 'Quality-focused role validating releases across manual and automated test coverage.',
    defaults: {
      position: 'QA Engineer',
      department: 'Software Development',
      experience: '1-3 Years',
      employmentType: 'Full-time',
      qualifications: ['BE', 'BTech', 'BSc'],
      skills: ['Test Automation', 'Selenium', 'API Testing', 'ISO Documentation'],
      responsibilities: [
        'Design and execute test plans across manual and automated suites',
        'Log, track, and verify defect resolution with engineering',
        'Maintain automated regression test coverage',
        'Sign off releases against quality and ATS-readiness criteria',
      ],
    },
  },
  {
    id: 'devops-engineer',
    name: 'DevOps Engineer',
    department: 'IT',
    blurb: 'Infrastructure and release-engineering role supporting CI/CD and cloud operations.',
    defaults: {
      position: 'DevOps Engineer',
      department: 'IT',
      experience: '3-5 Years',
      employmentType: 'Full-time',
      qualifications: ['BE', 'BTech', 'MCA'],
      skills: ['CI/CD', 'AWS', 'Docker', 'Kubernetes', 'Terraform'],
      responsibilities: [
        'Build and maintain CI/CD pipelines for engineering teams',
        'Manage cloud infrastructure with an infrastructure-as-code approach',
        'Monitor system reliability and lead incident response',
        'Improve deployment speed and rollback safety',
      ],
    },
  },
  {
    id: 'project-manager',
    name: 'Project Manager',
    department: 'Operations',
    blurb: 'Delivery-ownership role coordinating cross-functional project execution.',
    defaults: {
      position: 'Project Manager',
      department: 'Operations',
      experience: '5-8 Years',
      employmentType: 'Full-time',
      qualifications: ['BE', 'MBA', 'Any Postgraduate'],
      skills: ['Project Scheduling', 'Stakeholder Management', 'Budgeting', 'Risk Management'],
      responsibilities: [
        'Own project timelines, budgets, and delivery milestones',
        'Coordinate cross-functional teams and external vendors',
        'Report progress and risks to leadership stakeholders',
        'Drive resolution of blockers impacting delivery',
      ],
    },
  },
  {
    id: 'hr-executive',
    name: 'HR Executive',
    department: 'HR',
    blurb: 'Generalist HR role supporting recruitment, onboarding, and employee relations.',
    defaults: {
      position: 'HR Executive',
      department: 'HR',
      experience: '1-3 Years',
      employmentType: 'Full-time',
      qualifications: ['MBA', 'Any Graduate', 'Any Postgraduate'],
      skills: ['Recruitment', 'Onboarding', 'HRIS', 'Employee Relations'],
      responsibilities: [
        'Manage end-to-end recruitment for assigned departments',
        'Coordinate onboarding and documentation for new hires',
        'Support employee relations and policy compliance',
        'Maintain accurate HRIS records',
      ],
    },
  },
  {
    id: 'sales-executive',
    name: 'Sales Executive',
    department: 'Sales',
    blurb: 'Revenue-focused role building pipeline and closing new business.',
    defaults: {
      position: 'Sales Executive',
      department: 'Sales',
      experience: '1-3 Years',
      employmentType: 'Full-time',
      qualifications: ['Any Graduate', 'MBA'],
      skills: ['Lead Generation', 'CRM', 'Negotiation', 'Client Relationship Management'],
      responsibilities: [
        'Generate and qualify new sales leads within the assigned territory',
        'Deliver product demonstrations and proposals to prospects',
        'Negotiate and close new business against quarterly targets',
        'Maintain accurate pipeline records in CRM',
      ],
    },
  },
];
