// app.js

// --- PAYMENT INTEGRATION: Add the URL of your Render backend here ---
const RENDER_BACKEND_URL = 'https://your-backend-name.onrender.com';
// -------------------------------------------------------------------


import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, deleteUser, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
import { getFirestore, doc, onSnapshot, updateDoc, collection, query, orderBy, limit, runTransaction, deleteDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';

// --- Firebase Config ---
const firebaseConfig = {
    "apiKey": "AIzaSyC6ftH5iVNfoS2LI4SzVrz39b8XNLfn6m4",
    "authDomain": "neetsaathi-777.firebaseapp.com",
    "projectId": "neetsaathi-777",
    "storageBucket": "neetsaathi-777.firebasestorage.app",
    "messagingSenderId": "6994245484",
    "appId": "1:6994245484:web:98ef53592af6824f9f2549"
};

// --- Data ---
const defaultSyllabus = [
  {
    id: 'physics',
    name: 'Physics',
    subCategories: [
      {
        id: "physics11",
        name: "Class 11",
        chapters: [
          { "id": "ph11-01", "name": "Basic Maths & Calculus (Mathematical Tools)", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph11-02", "name": "Vectors", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph11-03", "name": "Units and Measurements", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph11-04", "name": "Motion in a straight line", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph11-05", "name": "Motion in a plane", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph11-06", "name": "Laws of Motion", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph11-07", "name": "Circular Motion", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph11-08", "name": "Work, energy and power", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph11-09", "name": "Centre of mass and System of Particles", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph11-10", "name": "Rotational Motion", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph11-11", "name": "Mechanical Properties of Solids", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph11-12", "name": "Mechanical Properties of Fluids", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph11-13", "name": "Thermal Properties of matter", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph11-14", "name": "Kinetic Theory", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph11-15", "name": "Thermodynamics", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph11-16", "name": "Oscillations", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph11-17", "name": "Waves", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } }
        ]
      },
      {
        id: "physics12",
        name: "Class 12",
        chapters: [
          { "id": "ph12-01", "name": "Electric Charges and Fields", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph12-02", "name": "Electrostatic Potential and Capacitance", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph12-03", "name": "Gravitation", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph12-04", "name": "Current Electricity", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph12-05", "name": "Moving Charges and Magnetism", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph12-06", "name": "Magnetism and Matter", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph12-07", "name": "Electromagnetic Induction", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph12-08", "name": "Alternating Current", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph12-09", "name": "Electromagnetic Waves", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph12-10", "name": "Ray Optics and Optical Instruments", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph12-11", "name": "Wave Optics", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph12-12", "name": "Dual Nature of Radiation and Matter", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph12-13", "name": "Atoms", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph12-14", "name": "Nuclei", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ph12-15", "name": "Semiconductor Electronics: Materials, Devices and Simple Circuits", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } }
        ]
      }
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    subCategories: [
      {
        id: "chem_physical",
        name: "Physical",
        chapters: [
          { "id": "cp-01", "name": "Some Basic Concept of Chemistry", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "cp-02", "name": "Redox Reaction", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "cp-03", "name": "Solutions", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "cp-04", "name": "Thermodynamics", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "cp-05", "name": "Chemical Equilibrium", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "cp-06", "name": "Ionic Equilibrium", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "cp-07", "name": "Electrochemistry", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "cp-08", "name": "Chemical Kinetics", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "cp-09", "name": "Structure of Atom", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "cp-10", "name": "Surface Chemistry", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } }
        ]
      },
      {
        id: "chem_organic",
        name: "Organic",
        chapters: [
            { "id": "co-01", "name": "IUPAC Naming", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
            { "id": "co-02", "name": "Isomerism", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
            { "id": "co-03", "name": "GOC", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
            { "id": "co-04", "name": "Hydrocarbon", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
            { "id": "co-05", "name": "Haloalkanes and Haloarenes", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
            { "id": "co-06", "name": "Alcohols, Ethers and Phenols", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
            { "id": "co-07", "name": "Aldehydes, Ketones and Carboxylic Acids", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
            { "id": "co-08", "name": "Amines", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
            { "id": "co-09", "name": "Biomolecules", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
            { "id": "co-10", "name": "Practical Organic Chemistry", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } }
        ]
      },
      {
        id: "chem_inorganic",
        name: "Inorganic",
        chapters: [
          { "id": "ci-01", "name": "Classification of Elements and Periodicity in Properties", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ci-02", "name": "Chemical Bonding and Molecular Structure", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ci-03", "name": "Co-ordination Compound", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ci-04", "name": "The p-Block Elements", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ci-05", "name": "The d and f-Block Elements", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "ci-06", "name": "Salt Analysis", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } }
        ]
      }
    ]
  },
  {
    id: 'biology',
    name: 'Biology',
    subCategories: [
      {
        id: "botany",
        name: "Botany",
        chapters: [
          { "id": "bo-01", "name": "Cell - The Unit of Life", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "bo-02", "name": "Cell Cycle and Cell Division", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "bo-03", "name": "The Living World", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "bo-04", "name": "Biological Classification", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "bo-05", "name": "Plant Kingdom", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "bo-06", "name": "Morphology of Flowering Plants", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "bo-07", "name": "Anatomy of Flowering Plants", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "bo-08", "name": "Respiration in Plants", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "bo-09", "name": "Photosynthesis in Higher Plants", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "bo-10", "name": "Plant Growth and Development", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "bo-11", "name": "Sexual Reproduction in Flowering Plant", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "bo-12", "name": "Molecular Basis of Inheritance", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "bo-13", "name": "Principle of Inheritance and Variation", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "bo-14", "name": "Microbes in Human Welfare", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "bo-15", "name": "Organisms and Population", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "bo-16", "name": "Ecosystem", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "bo-17", "name": "Biodiversity and Conservation", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } }
        ]
      },
      {
        id: "zoology",
        name: "Zoology",
        chapters: [
          { "id": "zo-01", "name": "Structure Organization in Animals", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "zo-02", "name": "Breathing and Exchange of Gases", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "zo-03", "name": "Body Fluids and Circulation", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "zo-04", "name": "Excretory Products & their Elimination", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "zo-05", "name": "Locomotion & Movement", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "zo-06", "name": "Neural Control & Coordination", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "zo-07", "name": "Chemical Coordination & Integration", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "zo-08", "name": "Animal Kingdom", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "zo-09", "name": "Biomolecules", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "zo-10", "name": "Human Reproduction", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "zo-11", "name": "Reproductive Health", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "zo-12", "name": "Human Health and Diseases", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "zo-13", "name": "Biotechnology: Principles and Processes", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "zo-14", "name": "Biotechnology and its Applications", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
          { "id": "zo-15", "name": "Evolution", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } }
        ]
      }
    ]
  }
];
const jeeSyllabus = [
    {
        id: 'physics', name: 'Physics', subCategories: [
            { id: "physics11", name: "Class 11", chapters: [
                { "id": "jph11-01", "name": "Units and Measurements", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph11-02", "name": "Basic Maths & Vectors", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph11-03", "name": "Motion in a Straight Line", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph11-04", "name": "Motion in a Plane", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph11-05", "name": "Laws of Motion", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph11-06", "name": "Work, Energy and Power", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph11-07", "name": "Rotational Motion", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph11-08", "name": "Gravitation", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph11-09", "name": "Mechanical Properties of Solids", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph11-10", "name": "Mechanical Properties of Fluids", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph11-11", "name": "Thermal Properties of Matter", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph11-12", "name": "Thermodynamics", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph11-13", "name": "Kinetic Theory", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph11-14", "name": "Oscillations", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph11-15", "name": "Waves", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } }
            ]},
            { id: "physics12", name: "Class 12", chapters: [
                { "id": "jph12-01", "name": "Electric Charges and Fields", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph12-02", "name": "Electrostatic Potential and Capacitance", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph12-03", "name": "Current Electricity", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph12-04", "name": "Moving Charges and Magnetism", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph12-05", "name": "Magnetism and Matter", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph12-06", "name": "Electromagnetic Induction", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph12-07", "name": "Alternating Current", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph12-08", "name": "Electromagnetic Waves", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph12-09", "name": "Ray Optics and Optical Instruments", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph12-10", "name": "Wave Optics", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph12-11", "name": "Dual Nature of Radiation and Matter", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph12-12", "name": "Atoms", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph12-13", "name": "Nuclei", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph12-14", "name": "Semiconductor Electronics", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jph12-15", "name": "Communication Systems", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } }
            ]}
        ]
    },
    {
        id: 'chemistry', name: 'Chemistry', subCategories: [
            { id: "chem_physical", name: "Physical", chapters: [
                { "id": "jcp-01", "name": "Mole Concept", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jcp-02", "name": "Atomic Structure", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jcp-03", "name": "States of Matter", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jcp-04", "name": "Thermodynamics", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jcp-05", "name": "Chemical Equilibrium", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jcp-06", "name": "Ionic Equilibrium", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jcp-07", "name": "Redox Reactions", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jcp-08", "name": "Solid State", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jcp-09", "name": "Solutions", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jcp-10", "name": "Electrochemistry", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jcp-11", "name": "Chemical Kinetics", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jcp-12", "name": "Surface Chemistry", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } }
            ]},
            { id: "chem_inorganic", name: "Inorganic", chapters: [
                { "id": "jci-01", "name": "Periodic Classification of Elements", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jci-02", "name": "Chemical Bonding", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jci-03", "name": "Hydrogen", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jci-04", "name": "s-Block Elements", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jci-05", "name": "p-Block Elements (13 & 14)", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jci-06", "name": "Environmental Chemistry", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jci-07", "name": "p-Block Elements (15 to 18)", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jci-08", "name": "d and f-Block Elements", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jci-09", "name": "Coordination Compounds", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jci-10", "name": "Metallurgy", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } }
            ]},
            { id: "chem_organic", name: "Organic", chapters: [
                { "id": "jco-01", "name": "Nomenclature & Isomerism", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jco-02", "name": "General Organic Chemistry (GOC)", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jco-03", "name": "Hydrocarbons", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jco-04", "name": "Haloalkanes and Haloarenes", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jco-05", "name": "Alcohols, Phenols and Ethers", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jco-06", "name": "Aldehydes, Ketones, and Carboxylic Acids", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jco-07", "name": "Amines (Nitrogen Containing Compounds)", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jco-08", "name": "Biomolecules", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jco-09", "name": "Polymers", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jco-10", "name": "Chemistry in Everyday Life", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } }
            ]}
        ]
    },
    {
        id: 'mathematics', name: 'Mathematics', subCategories: [
            { id: "math11", name: "Class 11", chapters: [
                { "id": "jma11-01", "name": "Basic Mathematics & Logarithms", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma11-02", "name": "Sets, Relations & Functions", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma11-03", "name": "Trigonometric Functions & Equations", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma11-04", "name": "Principle of Mathematical Induction", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma11-05", "name": "Complex Numbers & Quadratic Equations", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma11-06", "name": "Linear Inequalities", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma11-07", "name": "Permutations & Combinations", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma11-08", "name": "Binomial Theorem", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma11-09", "name": "Sequence & Series", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma11-10", "name": "Straight Lines", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma11-11", "name": "Conic Sections", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma11-12", "name": "Introduction to 3D Geometry", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma11-13", "name": "Limits & Derivatives", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma11-14", "name": "Mathematical Reasoning", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma11-15", "name": "Statistics", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma11-16", "name": "Probability", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } }
            ]},
            { id: "math12", name: "Class 12", chapters: [
                { "id": "jma12-01", "name": "Inverse Trigonometric Functions", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma12-02", "name": "Matrices", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma12-03", "name": "Determinants", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma12-04", "name": "Continuity & Differentiability", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma12-05", "name": "Application of Derivatives", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma12-06", "name": "Integrals", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma12-07", "name": "Application of Integrals", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma12-08", "name": "Differential Equations", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma12-09", "name": "Vector Algebra", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma12-10", "name": "Three Dimensional Geometry", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } },
                { "id": "jma12-11", "name": "Linear Programming", "checks": { "completed": false, "revision": false, "ncert": false, "pyq": false, "practice": false } }
            ]}
        ]
    }
];

const examData = {
    neet: {
        name: "NEET",
        countdown_title: "NEET 2026 Countdown",
        target_date: new Date('May 3, 2026 14:00:00').getTime(),
        syllabus: defaultSyllabus
    },
    jee: {
        name: "JEE",
        countdown_title: "JEE Main 2026 Countdown",
        target_date: new Date('January 24, 2026 09:00:00').getTime(),
        syllabus: jeeSyllabus
    }
};

// --- Global State ---
const appDiv = document.getElementById('app');
let syllabus = []; // Will be loaded based on user profile
let currentUser = null;
let currentUserProfile = null; // Holds user's full profile data
let unsubscribeUserSnap = null;
let unsubscribeStudyStats = null;
let unsubscribeTodoSnap = null;
let currentMainIndex = 0;
let currentSubIndex = 0;
let studyTimerInterval = null;
let studySeconds = 0;
let isStudyTimerRunning = false;
let countdownInterval = null;
let isInitialUserLoad = true;
let auth; // --- NEW: Make auth globally accessible
let db; // --- NEW: Make db globally accessible

// --- App Initialization ---
try {
  applyInitialTheme();
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app); // --- MODIFIED: Assign to global auth
  const provider = new GoogleAuthProvider();
  db = getFirestore(app); // --- MODIFIED: Assign to global db

  // --- Helper Functions ---
  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function formatTime(minutes) { if (minutes === 0 || !minutes) return "0m"; const h = Math.floor(minutes / 60); const m = minutes % 60; return `${h > 0 ? h + 'h ' : ''}${m}m`; }
  function formatSeconds(secs) { const h = Math.floor(secs / 3600); const m = Math.floor((secs % 3600) / 60); const s = secs % 60; return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`; }
  function getWeekNumber(d) { d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())); d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7)); const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1)); return Math.ceil((((d - yearStart) / 86400000) + 1)/7); }
  
  async function handleShare() {
      const shareData = {
          title: 'NeetSaathi - NEET & JEE Syllabus Tracker',
          text: 'Check out NeetSaathi, a free and powerful tool to track your NEET & JEE syllabus progress, manage tasks, and time your study sessions!',
          url: window.location.href
      };
      if (navigator.share) {
          try {
              await navigator.share(shareData);
          } catch (error) {
              console.error('Error sharing:', error);
          }
      } else {
          try {
              await navigator.clipboard.writeText(shareData.url);
              alert('Link copied to clipboard! Share it with your friends.');
          } catch (err) {
              console.error('Failed to copy link: ', err);
              alert('Sharing is not supported on this browser. Please copy the URL manually.');
          }
      }
  }

  function applyInitialTheme() {
    if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');
  }

  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) themeBtn.textContent = isDarkMode ? '☀️' : '🌙';
  }

// --- PAYMENT INTEGRATION START ---
async function handlePayment() {
    if (!currentUser || !currentUserProfile) {
        alert("Please sign in to proceed with the payment.");
        return;
    }

    // Basic details for the payment
    const paymentDetails = {
        amount: "10.00", // Example amount, you can make this dynamic
        productName: "NeetSaathi Premium",
        firstName: currentUserProfile.displayName || "Valued User",
        email: currentUser.email,
    };

    try {
        // Step 1: Call your Render backend to get payment parameters
        const response = await fetch(`${RENDER_BACKEND_URL}/create-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paymentDetails),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to initialize payment.');
        }

        const data = await response.json();

        // Step 2: Create a hidden form and auto-submit it to redirect to PayU
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = data.payu_url;
        form.style.display = 'none';

        // Add all required fields from the backend response to the form
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = data[key];
                form.appendChild(input);
            }
        }
        
        document.body.appendChild(form);
        form.submit();

    } catch (error) {
        console.error('Payment Error:', error);
        alert(`An error occurred: ${error.message}`);
    }
}
// --- PAYMENT INTEGRATION END ---

  
  // --- NEW: Auth Functions ---
  function showLoginModal() {
    const existingModal = document.querySelector('.login-modal-overlay');
    if (existingModal) return;

    const modal = el('div', 'login-modal-overlay');
    modal.innerHTML = `
        <div class="login-modal-content">
            <button class="login-modal-close" id="closeLoginModalBtn">&times;</button>
            <div id="login-view">
                <h2>Sign In to NeetSaathi</h2>
                <div class="login-providers">
                    <button id="googleSignInBtn"><span class="icon">G</span> Continue with Google</button>
                </div>
                <div class="separator">or</div>
                <div class="login-form">
                    <input type="email" id="emailInput" placeholder="Email Address">
                    <input type="password" id="passwordInput" placeholder="Password">
                    <button id="emailSignInBtn" class="btn btn-primary">Sign In with Email</button>
                    <div id="authError" class="errorBox" style="display:none;"></div>
                </div>
                 <p class="auth-toggle-link" id="showSignUp">Don't have an account? Sign Up</p>
            </div>
            <div id="signup-view" style="display:none;">
                <h2>Create an Account</h2>
                <div class="login-form">
                    <input type="email" id="signUpEmailInput" placeholder="Email Address">
                    <input type="password" id="signUpPasswordInput" placeholder="Password">
                    <button id="emailSignUpBtn" class="btn btn-primary">Create Account</button>
                    <div id="signUpError" class="errorBox" style="display:none;"></div>
                </div>
                <p class="auth-toggle-link" id="showSignInFromSignUp">Already have an account? Sign In</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // --- Attach all event listeners ---
    const closeModal = () => modal.remove();
    document.getElementById('closeLoginModalBtn').onclick = closeModal;
    
    // --- View Toggling ---
    const loginView = document.getElementById('login-view');
    const signupView = document.getElementById('signup-view');
    
    document.getElementById('showSignUp').onclick = () => { loginView.style.display = 'none'; signupView.style.display = 'block'; };
    document.getElementById('showSignInFromSignUp').onclick = () => { signupView.style.display = 'none'; loginView.style.display = 'block'; };

    // --- Auth Action Listeners ---
    document.getElementById('googleSignInBtn').onclick = async () => {
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
            closeModal();
        } catch (error) {
            document.getElementById('authError').textContent = error.message;
            document.getElementById('authError').style.display = 'block';
        }
    };

    document.getElementById('emailSignInBtn').onclick = async () => {
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;
        const errorDiv = document.getElementById('authError');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            closeModal();
        } catch (error) {
            errorDiv.textContent = "Invalid email or password.";
            errorDiv.style.display = 'block';
        }
    };

    document.getElementById('emailSignUpBtn').onclick = async () => {
        const email = document.getElementById('signUpEmailInput').value;
        const password = document.getElementById('signUpPasswordInput').value;
        const errorDiv = document.getElementById('signUpError');
        try {
            if (password.length < 6) {
                throw new Error("Password should be at least 6 characters.");
            }
            await createUserWithEmailAndPassword(auth, email, password);
            closeModal();
        } catch (error) {
            errorDiv.textContent = error.message;
            errorDiv.style.display = 'block';
        }
    };
  }


  // --- Main UI Rendering & View Management ---
  function renderAppShell() {
    appDiv.innerHTML = '';
    const container = el('div', 'container');
    const header = el('div', 'header');
    const brand = el('div', 'brand');
    brand.innerHTML = '<div class="logoEmoji"><span class="icon">🚀</span><span class="brand-name">NeetSaathi</span></div>';
    const viewSwitcher = el('div', 'view-switcher');
    viewSwitcher.innerHTML = `
        <button class="view-btn active" data-view="syllabus">Syllabus</button>
        <button class="view-btn" data-view="study-timer">Study Timer</button>
        <button class="view-btn" data-view="todo">To-Do</button>
        <button class="view-btn" data-view="profile">Profile</button>
    `;
    const actions = el('div', 'actions');
    actions.id = 'authActions';
    header.append(brand, viewSwitcher, actions);
    container.appendChild(header);
    const mainContent = el('div');
    mainContent.id = 'mainContent';
    container.appendChild(mainContent);
    const footer = el('div', 'footer');
    footer.innerHTML = `Your Companion for NEET & JEE Preparation | Made with ❤️ | v🚀3.1.1
                      <br><button id="footerShareBtn" class="btn" style="margin-top:10px; padding: 8px 14px;">Share with Friends</button>`;
    container.appendChild(footer);
    appDiv.appendChild(container);

    document.getElementById('footerShareBtn').onclick = handleShare;

    viewSwitcher.querySelectorAll('.view-btn').forEach(btn => {
      btn.onclick = () => setView(btn.dataset.view);
    });
  }
  
  function setView(viewName) {
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === viewName);
    });
    
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '';

    // Cleanup listeners from other views to prevent memory leaks
    if (unsubscribeStudyStats) { unsubscribeStudyStats(); unsubscribeStudyStats = null; }
    if (viewName !== 'todo' && unsubscribeTodoSnap) { unsubscribeTodoSnap(); unsubscribeTodoSnap = null; }
    
    // Pause study timer if navigating away (but don't reset seconds)
    if (viewName !== 'study-timer' && studyTimerInterval) {
      clearInterval(studyTimerInterval);
      studyTimerInterval = null;
      isStudyTimerRunning = false;
      document.title = 'NeetSaathi';
    }

    // Render the selected view
    if (viewName === 'syllabus') renderSyllabusView(mainContent);
    else if (viewName === 'study-timer') renderStudyTimerView(mainContent);
    else if (viewName === 'todo') renderTodoView(mainContent);
    else if (viewName === 'profile') renderProfileView(mainContent);
  }

  // --- Onboarding for New Users ---
  function renderExamSelectionModal() {
    const modal = el('div', 'modal-overlay');
    modal.innerHTML = `
      <div class="modal-content">
        <h2>Welcome to NeetSaathi!</h2>
        <p>Please select your primary exam goal to get started.</p>
        <div class="modal-buttons">
          <button class="btn" id="selectNeetBtn">NEET Aspirant</button>
          <button class="btn" id="selectJeeBtn">JEE Aspirant</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const selectExam = async (examType) => {
      if (!currentUser) return;
      const userRef = doc(db, 'users', currentUser.uid);
      const initialProfile = {
        displayName: currentUser.displayName || "Aspirant",
        photoURL: currentUser.photoURL || `https://api.dicebear.com/8.x/initials/svg?seed=${currentUser.email || currentUser.uid}`,
        email: currentUser.email,
        exam_type: examType,
        syllabus: JSON.parse(JSON.stringify(examData[examType].syllabus)),
        totalStudyMinutes: 0, dailyStudyMinutes: 0, weeklyStudyMinutes: 0,
        lastStudyDate: "", lastStudyWeek: "",
        todos: { biology: [], chemistry: [], physics: [], mathematics: [] }
      };
      await setDoc(userRef, initialProfile);
      modal.remove();
    };

    document.getElementById('selectNeetBtn').onclick = () => selectExam('neet');
    document.getElementById('selectJeeBtn').onclick = () => selectExam('jee');
  }

  // --- View-Specific Render Functions ---
  function renderSyllabusView(container) {
    if (!currentUserProfile) {
        container.innerHTML = `<div class="topcard"><p>Loading your profile...</p></div>`;
        return;
    }
    const currentExam = examData[currentUserProfile.exam_type];
    syllabus = currentUserProfile.syllabus || currentExam.syllabus;

    container.innerHTML = `
      <div class="topcard">
        <div class="topcard-header">
          <div class="topcard-title">
            <strong id="countdownTitle"></strong>
            <div id="countdownTimer">Loading...</div>
          </div>
          <div class="topcard-progress">
            <strong>Overall Progress</strong>
            <div class="progress"><div id="overallBar" style="width:0%"></div></div>
          </div>
        </div>
      </div>
      <div id="mainTabs" class="subjectTabs"></div>
      <div id="subTabs" class="subCategoryTabs"></div>
      <div id="listWrap" class="listWrap"></div>
    `;
    setupCountdown();
    renderAllTabs();
    selectSubject(currentMainIndex);
  }
  
  function renderStudyTimerView(container) {
    container.innerHTML = `
      <div class="study-timer-container">
        <div id="timerDisplay" class="timer-display">00:00:00</div>
        <div class="timer-controls">
            <button id="startPauseBtn" class="timer-btn start">Start</button>
            <button id="resetBtn" class="timer-btn reset">Reset</button>
        </div>
        <div class="log-session">
            <button id="logBtn" class="log-btn" disabled>Log Session</button>
            <p class="small" style="margin-top: 8px;">Log your time to save it to your stats.</p>
        </div>
        <div class="my-stats">
          <div class="stat-card"><h3>Today's Study</h3><p id="dailyTime">--</p></div>
          <div class="stat-card"><h3>Total Study</h3><p id="totalTime">--</p></div>
        </div>
      </div>
    `;
    attachStudyTimerListeners();
    listenForStudyStats();
  }

  function renderTodoView(container) {
    if (!currentUser) {
      container.innerHTML = `<div class="todo-container"><p>Please sign in to use the To-Do list.</p></div>`;
      return;
    }

    container.innerHTML = `
      <div class="todo-container">
        <div id="todoTabs" class="todo-tabs"></div>
        <div id="todoList" class="todo-list"></div>
        <div class="todo-input">
          <input type="text" id="newTaskInput" placeholder="New Task..." />
          <button id="addTaskBtn">Add</button>
        </div>
      </div>
    `;
    initializeTodo();
  }
  
  function renderProfileView(container) {
    if (!currentUser || !currentUserProfile) {
        container.innerHTML = `<div class="profile-container"><p>Please sign in to view your profile.</p></div>`;
        return;
    }
    container.innerHTML = `
      <div class="profile-container">
        <div class="profile-card">
          <div class="profile-header">
            <img src="${currentUserProfile.photoURL || 'https://via.placeholder.com/60'}" alt="User Avatar">
            <div>
              <h2>${currentUserProfile.displayName || 'Aspirant'}</h2>
              <p class="small">${currentUser.email || currentUser.phoneNumber || 'No contact info'}</p>
            </div>
          </div>
        </div>

        <div class="profile-card">
          <div class="profile-section">
            <h3>My Stream</h3>
            <div class="stream-selector">
              <label><input type="radio" name="stream" value="neet" ${currentUserProfile.exam_type === 'neet' ? 'checked' : ''}> NEET</label>
              <label><input type="radio" name="stream" value="jee" ${currentUserProfile.exam_type === 'jee' ? 'checked' : ''}> JEE</label>
            </div>
            <p class="small" style="margin-top: 8px;">Note: Switching streams will reset your syllabus progress for the new stream.</p>
          </div>
        </div>

        <div class="profile-card">
            <details class="profile-section-details">
                <summary><h3>How to Use NeetSaathi</h3></summary>
                <ul>
                    <li><strong>Syllabus:</strong> Track your chapter-wise progress for Completed, Revision, NCERT, PYQs, and Practice.</li>
                    <li><strong>Study Timer:</strong> Use the built-in timer to track study sessions. Press 'Log Session' to save your progress.</li>
                    <li><strong>To-Do:</strong> Create and manage subject-wise task lists to stay organized.</li>
                    <li><strong>Profile:</strong> Manage your stream, theme, and account settings.</li>
                </ul>
            </details>
            <details class="profile-section-details">
                <summary><h3>About Us</h3></summary>
                <p>NeetSaathi is a project dedicated to helping students preparing for the NEET and JEE exams. Our mission is to provide simple, effective tools to track progress, manage study time, and stay organized. We believe that with the right tools, every aspirant can achieve their goals. This app was created with the sole purpose of assisting the student community, offering all of its core features for free.</p>
            </details>
            <details class="profile-section-details">
                <summary><h3>Privacy Policy</h3></summary>
                <p>Your privacy is important to us. Your data, such as syllabus progress and study time, is securely stored with Google Firebase and is linked to your Google account. We only use this data to provide the app's features and never share it with third parties. You can permanently delete your account and all your associated data at any time from the profile page.</p>
            </details>
            <details class="profile-section-details">
                <summary><h3>Terms and Conditions</h3></summary>
                <p>By using NeetSaathi, you agree to use it as a tool for your exam preparation. The app is provided "as is" and is 100% free to use. We are not responsible for any data loss, though we use robust services like Firebase to prevent it. The syllabus data is based on the latest information available but should always be cross-verified with official sources.</p>
            </details>
            <details class="profile-section-details">
                <summary><h3>Refund Policy</h3></summary>
                <p>Currently, NeetSaathi offers all of its features for free. As such, there are no paid services or products available, and therefore, no refund policy is applicable at this time. Should we introduce premium features in the future, a comprehensive refund policy will be made available here.</p>
            </details>
            <details class="profile-section-details">
                <summary><h3>Help & Support</h3></summary>
                <p>For any questions, feedback, or issues, please don't hesitate to email us. We'd love to hear from you!</p>
                <p><strong>Email:</strong> <a href="mailto:contact@neetsaathi.in">contact@neetsaathi.in</a></p>
            </details>
        </div>

        <div class="profile-card">
            <h3>Account Management</h3>
            <button id="logoutBtn" class="btn">Logout</button>
            <button id="profileShareBtn" class="btn" style="margin-left: 10px;">Share App</button>
            <button id="supportBtn" class="btn btn-primary" style="margin-left: 10px;">Support Us</button>
            <button id="deleteAccountBtn" class="btn btn-delete" style="margin-left: 10px;">Delete Account</button>
        </div>
      </div>
    `;

    document.querySelectorAll('input[name="stream"]').forEach(radio => {
        radio.onchange = async (e) => {
            const newStream = e.target.value;
            if (newStream !== currentUserProfile.exam_type) {
                if (confirm("Are you sure you want to switch to " + newStream.toUpperCase() + "? Your current syllabus progress will be reset.")) {
                    const userRef = doc(db, 'users', currentUser.uid);
                    await updateDoc(userRef, { 
                        exam_type: newStream,
                        syllabus: JSON.parse(JSON.stringify(examData[newStream].syllabus))
                    });
                    currentMainIndex = 0;
                    currentSubIndex = 0;
                    setView('syllabus');
                } else {
                    e.target.checked = false;
                    const otherRadio = document.querySelector(`input[name="stream"][value="${currentUserProfile.exam_type}"]`);
                    if(otherRadio) otherRadio.checked = true;
                }
            }
        };
    });

    document.getElementById('logoutBtn').onclick = () => signOut(auth);
    document.getElementById('profileShareBtn').onclick = handleShare;
    // --- PAYMENT INTEGRATION: Add event listener for the support button ---
    document.getElementById('supportBtn').onclick = handlePayment;
    // -------------------------------------------------------------------
    document.getElementById('deleteAccountBtn').onclick = async () => {
        if (confirm("Are you absolutely sure? This will permanently delete your account and all your data. This action cannot be undone.")) {
            try {
                const userRef = doc(db, 'users', currentUser.uid);
                await deleteDoc(userRef);
                await deleteUser(auth.currentUser);
                alert("Account deleted successfully.");
            } catch (error) {
                console.error("Error deleting account:", error);
                alert("Error deleting account. You may need to sign in again to complete this action.");
            }
        }
    };
  }

  // --- Syllabus Logic ---
  function setupCountdown() {
    if(countdownInterval) clearInterval(countdownInterval);
    if (!currentUserProfile) return;

    const currentExam = examData[currentUserProfile.exam_type];
    const targetDate = currentExam.target_date;
    const timerEl = document.getElementById('countdownTimer');
    const titleEl = document.getElementById('countdownTitle');
    
    if (!timerEl || !titleEl) return;
    titleEl.textContent = currentExam.countdown_title;

    const update = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        if (distance < 0) {
            timerEl.innerHTML = "Exam has concluded.";
            clearInterval(countdownInterval);
            return;
        }
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
        timerEl.innerHTML = `<span>${d}d</span> <span>${h}h</span> <span>${m}m</span> <span>${s}s</span>`;
    };
    update();
    countdownInterval = setInterval(update, 1000);
  }
  function computeSubjectProgress(subCat) { let total = 0, done = 0; subCat.chapters.forEach(ch => { for (const k in ch.checks) { total++; if (ch.checks[k]) done++; } }); return total ? Math.round((done / total) * 100) : 0; }
  function updateOverallUI() { let totalChecks = 0, doneChecks = 0; if (!syllabus || syllabus.length === 0) return; syllabus.forEach(main => { main.subCategories.forEach(sub => { sub.chapters.forEach(ch => { for (const k in ch.checks) { totalChecks++; if (ch.checks[k]) doneChecks++; } }); }); }); const overallPercent = totalChecks ? Math.round((doneChecks / totalChecks) * 100) : 0; const bar = document.getElementById('overallBar'); if (bar) bar.style.width = overallPercent + '%'; }
  function renderChapters(mainIdx, subIdx) { const wrap = document.getElementById('listWrap'); if (!wrap) return; wrap.innerHTML = ''; const subCat = syllabus[mainIdx].subCategories[subIdx]; if (!subCat) return; const subjCard = el('div', 'topcard'); subjCard.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between"><div><strong style="font-size:16px">${subCat.name}</strong><div class="small">${subCat.chapters.length} chapters</div></div><div style="width:180px"><div class="progress"><div style="width:${computeSubjectProgress(subCat)}%"></div></div></div></div>`; wrap.appendChild(subjCard); subCat.chapters.forEach((ch, idx) => { const card = el('div', 'chapter'); const header = el('div', 'chapterHeader'); header.appendChild(el('div', 'chTitle', (idx + 1) + '. ' + ch.name)); let done = 0; for (const k in ch.checks) { if (ch.checks[k]) done++; } let percent = Math.round((done / 5) * 100); header.appendChild(el('div', 'small', percent + '%')); card.appendChild(header); const checks = el('div', 'checks'); const keys = [['completed', 'Completed'], ['revision', 'Revision'], ['ncert', 'NCERT'], ['pyq', 'PYQ'], ['practice', 'Practice']]; keys.forEach(kp => { const key = kp[0], label = kp[1]; const c = el('label', 'check'); const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = !!ch.checks[key]; cb.onchange = async (e) => { ch.checks[key] = e.target.checked; if (key === 'completed' && e.target.checked) { Object.keys(ch.checks).forEach(k => ch.checks[k] = true); } else if (key !== 'completed' && !e.target.checked) { ch.checks.completed = false; } else { const allSubsDone = ch.checks.revision && ch.checks.ncert && ch.checks.pyq && ch.checks.practice; if(allSubsDone) ch.checks.completed = true; } currentUserProfile.syllabus = syllabus; renderChapters(mainIdx, subIdx); updateOverallUI(); if (currentUser) { try { await updateDoc(doc(db, 'users', currentUser.uid), { syllabus: syllabus }); } catch (err) { console.error('save error', err); } } }; c.appendChild(cb); c.appendChild(el('div', '', label)); checks.appendChild(c); }); card.appendChild(checks); wrap.appendChild(card); }); updateOverallUI(); }
  function selectSubCategory(mainIdx, subIdx) { currentMainIndex = mainIdx; currentSubIndex = subIdx; const subTabsContainer = document.getElementById('subTabs'); if (!subTabsContainer) return; const subTabs = subTabsContainer.querySelectorAll('.subTab'); subTabs.forEach((t, i) => { t.className = 'subTab' + (i === subIdx ? ' active' : ''); }); renderChapters(mainIdx, subIdx); }
  function selectSubject(mainIdx) {
    currentMainIndex = mainIdx;
    const mainTabsContainer = document.getElementById('mainTabs');
    if (!mainTabsContainer) return;
    const mainTabs = mainTabsContainer.querySelectorAll('.tab');
    mainTabs.forEach((t, i) => {
        t.className = 'tab' + (i === mainIdx ? ' active' : '');
    });

    const subTabsContainer = document.getElementById('subTabs');
    subTabsContainer.innerHTML = '';
    const subCategories = syllabus[mainIdx].subCategories;
    subCategories.forEach((sc, i) => {
        let t = el('div', 'subTab', sc.name);
        t.onclick = () => selectSubCategory(mainIdx, i);
        subTabsContainer.appendChild(t);
    });
    if (currentSubIndex >= subCategories.length) {
        currentSubIndex = 0;
    }
    selectSubCategory(mainIdx, currentSubIndex);
  }
  function renderAllTabs() { const mainTabsContainer = document.getElementById('mainTabs'); if (!mainTabsContainer) return; mainTabsContainer.innerHTML = ''; syllabus.forEach((s, idx) => { let t = el('div', 'tab', s.name); t.onclick = () => { currentSubIndex = 0; selectSubject(idx); }; mainTabsContainer.appendChild(t); }); }

  // --- Study Timer Logic ---
  function attachStudyTimerListeners() {
      const startPauseBtn = document.getElementById('startPauseBtn');
      const resetBtn = document.getElementById('resetBtn');
      const logBtn = document.getElementById('logBtn');
      const timerDisplay = document.getElementById('timerDisplay');
      
      const updateDisplay = () => {
          if (timerDisplay) timerDisplay.textContent = formatSeconds(studySeconds);
          document.title = `${formatSeconds(studySeconds)} | NeetSaathi`;
          if (logBtn) logBtn.disabled = studySeconds < 60; // Enable log button only after 1 minute
      };

      const timer = () => { studySeconds++; updateDisplay(); };

      startPauseBtn.onclick = () => {
          if (isStudyTimerRunning) {
              clearInterval(studyTimerInterval);
              isStudyTimerRunning = false;
              startPauseBtn.textContent = 'Start';
              startPauseBtn.className = 'timer-btn start';
          } else {
              isStudyTimerRunning = true;
              startPauseBtn.textContent = 'Pause';
              startPauseBtn.className = 'timer-btn pause';
              studyTimerInterval = setInterval(timer, 1000);
          }
      };

      resetBtn.onclick = () => {
          if (isStudyTimerRunning) {
              clearInterval(studyTimerInterval);
              isStudyTimerRunning = false;
              startPauseBtn.textContent = 'Start';
              startPauseBtn.className = 'timer-btn start';
          }
          studySeconds = 0;
          updateDisplay();
          document.title = 'NeetSaathi';
      };

      logBtn.onclick = async () => {
          if (studySeconds < 60) {
              alert("You need to study for at least 1 minute to log a session.");
              return;
          }
          const minutesToLog = Math.floor(studySeconds / 60);
          await logStudySession(minutesToLog);
          alert(`Great job! ${minutesToLog} minute(s) have been added to your stats.`);
          resetBtn.onclick(); // Reset timer after logging
      };
      
      // Initial state
      updateDisplay();
      if(isStudyTimerRunning) {
        startPauseBtn.textContent = 'Pause';
        startPauseBtn.className = 'timer-btn pause';
      }
  }

  // --- To-Do Logic ---
  function initializeTodo() {
    let currentCat;
    let tasks = currentUserProfile?.todos || {};
    const userRef = doc(db, 'users', currentUser.uid);

    function renderTabs() {
        const tabsContainer = document.getElementById('todoTabs');
        if (!tabsContainer || !currentUserProfile) return;
        tabsContainer.innerHTML = '';
        const subjects = examData[currentUserProfile.exam_type].syllabus.map(s => ({id: s.id, name: s.name}));
        subjects.forEach((subject, index) => {
            const tab = el('button', 'todo-tab', subject.name);
            tab.dataset.cat = subject.id;
            if (index === 0) {
                tab.classList.add('active');
                currentCat = subject.id;
            }
            tab.onclick = () => switchCategory(subject.id);
            tabsContainer.appendChild(tab);
        });
        renderTasks();
    }

    function switchCategory(catId) {
        currentCat = catId;
        document.querySelectorAll('.todo-tab').forEach(t => t.classList.toggle('active', t.dataset.cat === catId));
        renderTasks();
    }

    function renderTasks() {
      const list = document.getElementById('todoList');
      if (!list) return;
      list.innerHTML = '';
      const arr = tasks[currentCat] || [];
      arr.forEach((t, i) => {
        const item = el('div', 'todo-item');
        item.innerHTML = `
          <label style="display:flex;align-items:center;gap:8px; flex: 1; overflow: hidden; text-overflow: ellipsis;">
            <input type="checkbox" ${t.done ? 'checked' : ''}/>
            <span style="${t.done ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${t.text}</span>
          </label>
          <div><button class="delBtn" title="Delete" style="background:none;border:none;cursor:pointer;font-size:16px;">❌</button></div>`;
        item.querySelector('input[type="checkbox"]').onchange = (e) => {
          tasks[currentCat][i].done = e.target.checked;
          saveTasks().then(renderTasks);
        };
        item.querySelector('.delBtn').onclick = () => {
          tasks[currentCat].splice(i, 1);
          saveTasks().then(renderTasks);
        };
        list.appendChild(item);
      });
    }

    async function saveTasks() {
      if (!currentUser) return;
      try {
        await updateDoc(userRef, { todos: tasks });
      } catch (e) { console.error("Failed to save todos:", e); }
    }
    
    document.getElementById('addTaskBtn').onclick = () => {
      const input = document.getElementById('newTaskInput');
      if (input && input.value.trim()) {
        if (!tasks[currentCat]) tasks[currentCat] = [];
        tasks[currentCat].push({ text: input.value.trim(), done: false });
        input.value = '';
        saveTasks().then(renderTasks);
      }
    };
    
    renderTabs();
    unsubscribeTodoSnap = onSnapshot(userRef, (snap) => {
      if (!snap.exists()) return;
      tasks = snap.data().todos || {};
      renderTasks();
    });
  }

  // --- Firestore Logic ---
  async function logStudySession(minutes) {
    if (!currentUser || !minutes || minutes < 1) return;
    const userRef = doc(db, 'users', currentUser.uid);
    try {
      await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists()) return;
        const data = userDoc.data();
        const now = new Date(), currentDate = now.toISOString().slice(0, 10), currentWeek = `${now.getFullYear()}-${getWeekNumber(now)}`;
        const lastDate = data.lastStudyDate || "", lastWeek = data.lastStudyWeek || "";
        const daily = (currentDate === lastDate) ? (data.dailyStudyMinutes || 0) + minutes : minutes;
        const weekly = (currentWeek === lastWeek) ? (data.weeklyStudyMinutes || 0) + minutes : minutes;
        const total = (data.totalStudyMinutes || 0) + minutes;
        transaction.update(userRef, { totalStudyMinutes: total, dailyStudyMinutes: daily, weeklyStudyMinutes: weekly, lastStudyDate: currentDate, lastStudyWeek: currentWeek });
      });
    } catch (e) { console.error("Study session logging failed: ", e); }
  }

  function listenForStudyStats() { 
      if (!currentUser) return; 
      const userRef = doc(db, 'users', currentUser.uid); 
      unsubscribeStudyStats = onSnapshot(userRef, (docSnap) => { 
          const data = docSnap.data(); 
          if (data && document.getElementById('dailyTime')) { 
              const today = new Date().toISOString().slice(0, 10); 
              const dailyMins = data.lastStudyDate === today ? data.dailyStudyMinutes || 0 : 0; 
              document.getElementById('dailyTime').textContent = formatTime(dailyMins); 
              document.getElementById('totalTime').textContent = formatTime(data.totalStudyMinutes || 0); 
          } 
      }); 
  }

  // --- Auth Logic ---
   
   // Replace the entire old setAuthUI function with this new one

function setAuthUI(user) {
    const actions = document.getElementById('authActions');
    if (!actions) return;
    actions.innerHTML = '';
    
    const themeToggleBtn = el('button', 'btn');
    themeToggleBtn.id = 'themeToggleBtn';
    themeToggleBtn.setAttribute('aria-label', 'Toggle Dark Mode');
    themeToggleBtn.style.cssText = 'padding: 8px; font-size: 18px; line-height: 1;';
    themeToggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    themeToggleBtn.onclick = toggleTheme;
    actions.appendChild(themeToggleBtn);

    if (user) {
      const userAvatar = el('img');
      userAvatar.id = 'headerUserAvatar'; // --- NEW: Give the avatar an ID
      
      // --- MODIFIED: Use the profile photoURL if it exists, otherwise use the placeholder ---
      userAvatar.src = (currentUserProfile && currentUserProfile.photoURL) 
                       ? currentUserProfile.photoURL 
                       : `https://api.dicebear.com/8.x/initials/svg?seed=${user.uid}`;
                       
      userAvatar.alt = "User Avatar";
      userAvatar.style.cssText = 'width:32px; height:32px; border-radius:999px; object-fit:cover; cursor:pointer;';
      userAvatar.onclick = () => setView('profile');
      actions.appendChild(userAvatar);
    } else {
      const signInBtn = el('button', 'btn', 'Sign in');
      signInBtn.id = 'signInBtn';
      signInBtn.onclick = showLoginModal;
      actions.appendChild(signInBtn);
    }
}

// We also need a small change in the main onAuthStateChanged listener
// to make sure the header icon updates when the profile data loads.

onAuthStateChanged(auth, (user) => {
    if (unsubscribeUserSnap) { unsubscribeUserSnap(); unsubscribeUserSnap = null; }
    
    if (user) {
        currentUser = user;
        const userRef = doc(db, 'users', user.uid);
        
        unsubscribeUserSnap = onSnapshot(userRef, (snap) => {
            const headerAvatar = document.getElementById('headerUserAvatar'); // --- NEW ---
            if (snap.exists()) {
                currentUserProfile = snap.data();
                syllabus = currentUserProfile.syllabus || [];
                
                // --- NEW: Update the header avatar if it exists ---
                if (headerAvatar && currentUserProfile.photoURL) {
                    headerAvatar.src = currentUserProfile.photoURL;
                }

                if (isInitialUserLoad) {
                    setView('syllabus');
                    isInitialUserLoad = false;
                } else {
                    const activeView = document.querySelector('.view-btn.active')?.dataset.view || 'syllabus';
                    if (activeView === 'syllabus') {
                       updateOverallUI();
                    }
                    // --- NEW: If the user is on the profile page, re-render it to show correct data ---
                    if (activeView === 'profile') {
                        renderProfileView(document.getElementById('mainContent'));
                    }
                }
            } else {
                renderExamSelectionModal();
            }
        }, err => {
            console.error("Firestore snapshot error:", err);
            document.getElementById('mainContent').innerHTML = `<div class="errorBox">Could not load user data. Please check your connection and refresh.</div>`;
        });
        
    } else {
        currentUser = null;
        currentUserProfile = null;
        syllabus = [];
        isInitialUserLoad = true;
        const mainContent = document.getElementById('mainContent');
        if(mainContent) {
            mainContent.innerHTML = `<div class="topcard" style="text-align:center;">
                <h2>Welcome to NeetSaathi</h2>
                <p>Your ultimate companion for NEET & JEE preparation.<br/>Please sign in to begin your journey.</p>
                <button id="mainSignInBtn" class="btn btn-primary">Sign In to Get Started</button>
            </div>`;
            document.getElementById('mainSignInBtn').onclick = showLoginModal;
        }
    }
    setAuthUI(user);
});


  // --- Initial Load ---
  renderAppShell();

} catch (err) {
  console.error(err);
  appDiv.innerHTML = `<div class="errorBox">A critical error occurred: ${err.message}. Please refresh the page.</div>`;
}
