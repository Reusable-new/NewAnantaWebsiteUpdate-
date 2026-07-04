import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestoreDb, getStorageBucket, isFirebaseConfigured } from './firebase';
import type { BlogPost, Testimonial, Lead } from './contentService';

const BLOG_COLLECTION = 'blogPosts';
const TESTIMONIALS_COLLECTION = 'testimonials';
const LEADS_COLLECTION = 'leads';

export async function uploadImageToFirebase(file: File, folder: 'blog-images' | 'testimonial-images') {
  if (!isFirebaseConfigured) return null;

  const storage = getStorageBucket();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${safeName}`;
  const storageRef = ref(storage, `${folder}/${fileName}`);

  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

export async function getRemoteBlogPosts(): Promise<BlogPost[]> {
  if (!isFirebaseConfigured) return [];
  const db = getFirestoreDb();
  const q = query(collection(db, BLOG_COLLECTION), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnapshot) => ({ ...(docSnapshot.data() as BlogPost), id: Number(docSnapshot.id) }));
}

export async function getRemoteBlogPostById(id: number): Promise<BlogPost | null> {
  if (!isFirebaseConfigured) return null;
  const db = getFirestoreDb();
  const snapshot = await getDoc(doc(db, BLOG_COLLECTION, String(id)));
  if (!snapshot.exists()) return null;
  return { ...(snapshot.data() as BlogPost), id };
}

export async function saveRemoteBlogPost(post: Omit<BlogPost, 'id'>) {
  if (!isFirebaseConfigured) return null;
  const db = getFirestoreDb();
  const nextId = Date.now();
  const docRef = doc(db, BLOG_COLLECTION, String(nextId));
  await setDoc(docRef, { ...post, id: nextId, createdAt: new Date().toISOString() });
  return { ...post, id: nextId } as BlogPost;
}

export async function updateRemoteBlogPost(id: number, updates: Partial<Omit<BlogPost, 'id'>>) {
  if (!isFirebaseConfigured) return null;
  const db = getFirestoreDb();
  const docRef = doc(db, BLOG_COLLECTION, String(id));
  await updateDoc(docRef, updates as any);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? ({ ...(snapshot.data() as BlogPost), id } as BlogPost) : null;
}

export async function deleteRemoteBlogPost(id: number) {
  if (!isFirebaseConfigured) return false;
  await deleteDoc(doc(getFirestoreDb(), BLOG_COLLECTION, String(id)));
  return true;
}

export async function getRemoteTestimonials(): Promise<Testimonial[]> {
  if (!isFirebaseConfigured) return [];
  const snapshot = await getDocs(collection(getFirestoreDb(), TESTIMONIALS_COLLECTION));
  return snapshot.docs.map((docSnapshot) => ({ ...(docSnapshot.data() as Testimonial), id: docSnapshot.id }));
}

export async function addRemoteTestimonial(testimonial: Omit<Testimonial, 'image'> & { image?: string }) {
  if (!isFirebaseConfigured) return null;
  const db = getFirestoreDb();
  const id = String(Date.now());
  const docRef = doc(db, TESTIMONIALS_COLLECTION, id);
  const newTestimonial: Testimonial = {
    id,
    image: testimonial.image || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    ...testimonial,
  } as Testimonial;
  await setDoc(docRef, newTestimonial as any);
  return newTestimonial;
}

export async function removeRemoteTestimonial(id: string) {
  if (!isFirebaseConfigured) return false;
  await deleteDoc(doc(getFirestoreDb(), TESTIMONIALS_COLLECTION, id));
  return true;
}

export async function getRemoteLeads(): Promise<Lead[]> {
  if (!isFirebaseConfigured) return [];
  const snapshot = await getDocs(collection(getFirestoreDb(), LEADS_COLLECTION));
  return snapshot.docs.map((docSnapshot) => ({ ...(docSnapshot.data() as Lead), id: Number(docSnapshot.id) }));
}

export async function removeRemoteLead(id: number) {
  if (!isFirebaseConfigured) return false;
  await deleteDoc(doc(getFirestoreDb(), LEADS_COLLECTION, String(id)));
  return true;
}

export async function saveRemoteLead(lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) {
  if (!isFirebaseConfigured) return null;
  const db = getFirestoreDb();
  const id = String(Date.now());
  const docRef = doc(db, LEADS_COLLECTION, id);
  const newLead: Lead = {
    ...lead,
    id: Number(id),
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  await setDoc(docRef, newLead as any);
  return newLead;
}
