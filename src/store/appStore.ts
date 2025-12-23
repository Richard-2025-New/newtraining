import { create } from 'zustand'

export interface User {
  id: string
  name: string
  email: string
  points?: number
  avatar?: string
  userType: 'newcomer' | 'student' | 'boss'
  joinDate: string
  bio?: string
  totalPoints: number
  points?: number
  currentStreak: number
  totalStudyTime: number
  completedCourses: number
  enrolledCourses?: string[]
  level?: number
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  instructorTitle?: string
  duration: string
  level: string
  rating?: number
  studentCount?: number
  students?: number
  price: number
  originalPrice?: number
  coverImage?: string
  category: string
  targetAudience?: string[]
  learningObjectives?: string[]
  prerequisites?: string[]
  status?: 'not-started' | 'in-progress' | 'completed'
  progress?: number
  chapters?: Chapter[]
  features?: string[]
  isHot?: boolean
  isNew?: boolean
  reviewCount?: number
}

export interface Chapter {
  id: string
  title: string
  description: string
  duration: string
  type?: 'foundation' | 'practice' | 'advanced' | 'policy'
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  duration: string
  type: 'video' | 'text' | 'assignment' | 'quiz'
  completed: boolean
  locked: boolean
  content?: string
  videoUrl?: string
  assignment?: Assignment
}

export interface Assignment {
  id: string
  type: 'essay' | 'file' | 'quiz' | 'project'
  title: string
  description: string
  requirements?: string[]
  deadline: string
  maxScore: number
  submitted?: boolean
  submission?: Submission
  feedback?: Feedback
}

export interface Submission {
  id: string
  content?: string
  files?: File[]
  submittedAt: string
  status: 'pending' | 'graded'
}

export interface Feedback {
  score: number
  comment: string
  gradedAt: string
  gradedBy: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon?: string
  earned?: boolean
  unlocked?: boolean
  earnedDate?: string
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
  progress?: number
  target?: number
  points?: number
}

export interface Order {
  id: string
  userId: string
  courseIds: string[]
  totalAmount: number
  paymentMethod: string
  status: 'pending' | 'completed' | 'failed'
  createdAt: Date
  paymentAt?: Date
}

interface AppState {
  user: User | null
  isAuthenticated: boolean
  selectedUserType: string
  courses: Course[]
  currentCourse: Course | null
  currentChapter: number
  currentLesson: number
  learningProgress: { [courseId: string]: number }
  completedLessons: string[]
  achievements: Achievement[]
  orders: Order[]
  sidebarOpen: boolean
  activeTab: string
  setUser: (user: User | null) => void
  setAuthenticated: (authenticated: boolean) => void
  setSelectedUserType: (userType: string) => void
  setCourses: (courses: Course[]) => void
  setCurrentCourse: (course: Course | null) => void
  setCurrentChapter: (chapter: number) => void
  setCurrentLesson: (lesson: number) => void
  updateLessonProgress: (courseId: string, chapterIndex: number, lessonIndex: number, completed: boolean) => void
  addCompletedLesson: (lessonId: string) => void
  updateCourseProgress: (courseId: string, progress: number) => void
  toggleSidebar: () => void
  setActiveTab: (tab: string) => void
  unlockAchievement: (achievementId: string) => void
  setCurrentUser: (user: User) => void
  login: (email: string, password: string) => Promise<User | null>
  logout: () => void
  addOrder: (order: Order) => void
  enrollCourse: (courseId: string) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  selectedUserType: 'newcomer',
  courses: [],
  currentCourse: null,
  currentChapter: 0,
  currentLesson: 0,
  learningProgress: {},
  completedLessons: [],
  achievements: [],
  orders: [],
  sidebarOpen: false,
  activeTab: 'overview',

  setUser: (user) => set({ user }),
  setCurrentUser: (user) => set({ user, isAuthenticated: true }),
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  setSelectedUserType: (userType) => set({ selectedUserType: userType }),
<<<<<<< HEAD
  login: async (email, password) => {
    // 模拟登录
    const user: User = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0] || '用户',
      email,
      userType: 'newcomer',
      joinDate: new Date().toISOString(),
      totalPoints: 0,
      points: 0,
      currentStreak: 0,
      totalStudyTime: 0,
      completedCourses: 0,
      enrolledCourses: [],
      level: 1
    }
    set({ user, isAuthenticated: true })
    return user
  },
  logout: () => set({ user: null, isAuthenticated: false }), // 实现 logout
=======
login: async (email, password) => {
  const user: User = {
    id: `user-${Date.now()}`,
    name: email.split('@')[0] || '用户',
    email,
    userType: 'newcomer',
    joinDate: new Date().toISOString(),
    totalPoints: 0,
    points: 0,
    currentStreak: 0,
    totalStudyTime: 0,
    completedCourses: 0,
    enrolledCourses: [],
    level: 1
  }
  set({ user, isAuthenticated: true })
  return user
},
  logout: () => set({ user: null, isAuthenticated: false }),
>>>>>>> 543f6950a582ae677cf3fd4bd67ce36b28773968

  setCourses: (courses) => set({ courses }),
  setCurrentCourse: (course) => set({ currentCourse: course }),
  setCurrentChapter: (chapter) => set({ currentChapter: chapter }),
  setCurrentLesson: (lesson) => set({ currentLesson: lesson }),

  updateLessonProgress: (courseId, chapterIndex, lessonIndex, completed) => {
    console.log('Update progress:', courseId, chapterIndex, lessonIndex, completed)
  },

  addCompletedLesson: (lessonId) => {
    const state = get()
    if (!state.completedLessons.includes(lessonId)) {
      set({
        completedLessons: [...state.completedLessons, lessonId]
      })
    }
  },

  updateCourseProgress: (courseId, progress) => {
    const state = get()
    set({
      learningProgress: {
        ...state.learningProgress,
        [courseId]: progress
      }
    })
  },

  addOrder: (order) => {
    const state = get()
    set({ orders: [...state.orders, order] })
    if (order.status === 'completed' && state.user) {
      const currentEnrolled = state.user.enrolledCourses || []
      const newEnrolled = [...new Set([...currentEnrolled, ...order.courseIds])]
      set({
        user: {
          ...state.user,
          enrolledCourses: newEnrolled
        }
      })
    }
  },

  enrollCourse: (courseId) => {
    const state = get()
    if (state.user) {
      const currentEnrolled = state.user.enrolledCourses || []
      if (!currentEnrolled.includes(courseId)) {
        set({
          user: {
            ...state.user,
            enrolledCourses: [...currentEnrolled, courseId]
          }
        })
      }
    }
  },

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setActiveTab: (tab) => set({ activeTab: tab }),

  unlockAchievement: (achievementId) => {
    const state = get()
    const achievement = state.achievements.find(a => a.id === achievementId)
    if (achievement && !achievement.earned) {
      set({
        achievements: state.achievements.map(a =>
          a.id === achievementId
            ? { ...a, earned: true, earnedDate: new Date().toISOString(), unlocked: true }
            : a
        )
      })
    }
  }
}))
