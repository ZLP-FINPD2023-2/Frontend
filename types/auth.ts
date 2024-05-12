interface AuthInterface {
  email: string
  password: string
}

interface AuthResponseInterface {
  token: string
}
interface RegistrationInterface {
  birthday: number
  email: string
  first_name: string
  gender: boolean
  last_name: string
  password: string
  patronymic: string
}
