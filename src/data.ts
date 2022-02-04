const RECOVERY_DESCRIPTIONS = ['warm bath', 'fascia roll', 'massage', 'nap'] as const // needed for RecoveryDescription type

const SESSION_START_HOURS = [9, 14, 19]

export type RestLevel = 1 | 2 | 3

export type IntensityLevel = 1 | 2 | 3

export type RecoveryDescription = typeof RECOVERY_DESCRIPTIONS[number]

interface SessionFields {
  id: number
  date: string // yyyy-MM-dd
  startTime: string // hh:mm
  endTime: string // hh:mm
  duration: number // minutes
  restLevel: RestLevel
}

export interface TrainingSession extends SessionFields {
  type: 'training'
  intensityLevel: IntensityLevel
  load: number // intensityLevel * duration in minutes
}

export interface RecoverySession extends SessionFields {
  type: 'recovery'
  description: RecoveryDescription
}

export type Session = TrainingSession | RecoverySession

function randomInt(min: number, max: number): number {
  return min + Math.floor((max - min + 1) * Math.random())
}

function randomItem<T>(items: readonly T[]): T {
  return items[Math.floor(items.length * Math.random())]
}

export function mockApiCallToFetchSessions(): Promise<Session[]> {
  const sessions = [] as Session[]
  return new Promise((resolve, reject) => {
    if (!navigator.onLine) {
      return reject(new Error('offline'))
    }
    const date = new Date()
    for (let d = 0; d < randomInt(5, 10); d++) {
      date.setDate(date.getDate() + 1)
      for (let t = 0; t < randomInt(2, 3); t++) {
        const startTime = randomItem(SESSION_START_HOURS)
        const endTime = startTime + Math.floor(Math.random() * 2 * 12) / 12 + 1
        const duration = (endTime - startTime) * 60
        const isoDate = date.toISOString().substring(0, 10)
        const isoStartTime = new Date(startTime * 60 * 60 * 1000).toISOString().substring(11, 16)
        const isoEndTime = new Date(endTime * 60 * 60 * 1000).toISOString().substring(11, 16)
        if (Math.random() < 0.3) {
          // about double the number of training than recovery sessions
          // create recovery session
          sessions.push({
            id: sessions.length,
            type: 'recovery',
            date: isoDate,
            startTime: isoStartTime,
            endTime: isoEndTime,
            duration,
            restLevel: randomInt(1, 3) as RestLevel,
            description: randomItem(RECOVERY_DESCRIPTIONS),
          })
        } else {
          // create training session
          const intensityLevel = randomInt(1, 3) as IntensityLevel
          sessions.push({
            id: sessions.length,
            type: 'training',
            date: isoDate,
            startTime: isoStartTime,
            endTime: isoEndTime,
            duration,
            restLevel: randomInt(1, 3) as RestLevel,
            intensityLevel,
            load: duration * intensityLevel,
          })
        }
      }
    }
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error('timeout'))
      } else {
        resolve(sessions)
      }
    }, randomInt(100, 3000))
  })
}
