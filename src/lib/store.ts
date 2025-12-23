import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  avatar: string
  userType: 'newcomer' | 'student' | 'boss'
  isLoggedIn: boolean
}

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  price: number
  level: string
  category: string
  thumbnail: string
  progress: number
  enrolled: boolean
}

interface LearningProgress {
  courseId: string
  completedLessons: number
  totalLessons: number
  lastAccessed: string
  certificates: string[]
}

interface AppState {
  // 用户状态
  user: User | null
  setUser: (user: User | null) => void
  updateUser: (updates: Partial<User>) => void
  
  // 课程状态
  courses: Course[]
  setCourses: (courses: Course[]) => void
  enrollCourse: (courseId: string) => void
  updateCourseProgress: (courseId: string, progress: number) => void
  
  // 学习进度
  learningProgress: LearningProgress[]
  setLearningProgress: (progress: LearningProgress[]) => void
  updateLearningProgress: (courseId: string, progress: Partial<LearningProgress>) => void
  
  // UI状态
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  
  // 通知状态
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
  removeNotification: (id: string) => void
  
  // 购物车状态
  cart: CartItem[]
  addToCart: (course: Course) => void
  removeFromCart: (courseId: string) => void
  clearCart: () => void
}

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: number
  read: boolean
}

interface CartItem {
  course: Course
  addedAt: number
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 用户状态
      user: null,
      setUser: (user) => set({ user }),
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
      
      // 课程状态
      courses: [],
      setCourses: (courses) => set({ courses }),
      enrollCourse: (courseId) => set((state) => ({
        courses: state.courses.map(course =>
          course.id === courseId ? { ...course, enrolled: true } : course
        )
      })),
      updateCourseProgress: (courseId, progress) => set((state) => ({
        courses: state.courses.map(course =>
          course.id === courseId ? { ...course, progress } : course
        )
      })),
      
      // 学习进度
      learningProgress: [],
      setLearningProgress: (learningProgress) => set({ learningProgress }),
      updateLearningProgress: (courseId, progress) => set((state) => ({
        learningProgress: state.learningProgress.map(lp =>
          lp.courseId === courseId ? { ...lp, ...progress } : lp
        )
      })),
      
      // UI状态
      sidebarOpen: false,
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      
      // 通知状态
      notifications: [],
      addNotification: (notification) => set((state) => ({
        notifications: [{
          ...notification,
          id: Date.now().toString(),
          timestamp: Date.now(),
          read: false
        }, ...state.notifications]
      })),
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
      
      // 购物车状态
      cart: [],
      addToCart: (course) => set((state) => {
        const exists = state.cart.find(item => item.course.id === course.id)
        if (exists) {
          return state
        }
        return {
          cart: [...state.cart, { course, addedAt: Date.now() }]
        }
      }),
      removeFromCart: (courseId) => set((state) => ({
        cart: state.cart.filter(item => item.course.id !== courseId)
      })),
      clearCart: () => set({ cart: [] })
    }),
    {
      name: 'newtrain-store',
      partialize: (state) => ({
        user: state.user,
        courses: state.courses,
        learningProgress: state.learningProgress,
        cart: state.cart
      })
    }
  )
)

// 用户相关 hooks
export const useUser = () => {
  const user = useStore(state => state.user)
  const setUser = useStore(state => state.setUser)
  const updateUser = useStore(state => state.updateUser)
  
  return { user, setUser, updateUser }
}

// 课程相关 hooks
export const useCourses = () => {
  const courses = useStore(state => state.courses)
  const setCourses = useStore(state => state.setCourses)
  const enrollCourse = useStore(state => state.enrollCourse)
  const updateCourseProgress = useStore(state => state.updateCourseProgress)
  
  return { courses, setCourses, enrollCourse, updateCourseProgress }
}

// 学习进度相关 hooks
export const useLearningProgress = () => {
  const learningProgress = useStore(state => state.learningProgress)
  const setLearningProgress = useStore(state => state.setLearningProgress)
  const updateLearningProgress = useStore(state => state.updateLearningProgress)
  
  return { learningProgress, setLearningProgress, updateLearningProgress }
}

// 购物车相关 hooks
export const useCart = () => {
  const cart = useStore(state => state.cart)
  const addToCart = useStore(state => state.addToCart)
  const removeFromCart = useStore(state => state.removeFromCart)
  const clearCart = useStore(state => state.clearCart)
  
  return { cart, addToCart, removeFromCart, clearCart }
}

// UI状态相关 hooks
export const useUI = () => {
  const sidebarOpen = useStore(state => state.sidebarOpen)
  const setSidebarOpen = useStore(state => state.setSidebarOpen)
  
  return { sidebarOpen, setSidebarOpen }
}

// 通知相关 hooks
export const useNotifications = () => {
  const notifications = useStore(state => state.notifications)
  const addNotification = useStore(state => state.addNotification)
  const removeNotification = useStore(state => state.removeNotification)
  
  return { notifications, addNotification, removeNotification }
}