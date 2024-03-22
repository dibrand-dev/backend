import {type Provider, StatusCodeResponse, AppErrorGeneric, type BasicFilters} from '../../shared'
import {Society, type SocietyDTO} from '../../society/domain/society'
import {type Advance} from '../../advance'

export interface UserDTO {
    id: string
    name: string
    lastname: string
    email: string
    provider?: Provider
    societies?: SocietyDTO[]
    created_at: string
}

export type SummaryUser = Pick<UserDTO, 
    'id' |
    'email' |
    'name' |
    'lastname'
>

export type IdentifierUser = Pick<UserDTO, 'id'>

export interface FiltersUser extends BasicFilters {
    name?: string
    id?: string
    email?: string
}

export type CmdCreateUserDTO = Pick<UserDTO,
    'email' |
    'name' |
    'lastname'
> & { password: string, society: {
        economic_activity: string,
        month_activity: number,
        monthly_billing:number,
        person_type: string
    }  }

export type UserDAO = UserDTO

export class User {
    public provider?: Provider
    public societies: Society[] = []

    constructor(
        public id: string,
        public name: string,
        public lastname: string,
        public email: string,
        public createAt: string
    ) {
    }

    toDTO(): UserDTO {
        return {
            id: this.id,
            name: this.name,
            lastname: this.lastname,
            email: this.email,
            created_at: this.createAt,
            provider: this.provider,
            societies: this.societies?.map((s) => s.toDTO())
        }
    }

    static fromDTO(dto: UserDTO): User {
        const user = new User(
            dto.id,
            dto.name,
            dto.lastname,
            dto.email,
            dto.created_at
        )
        user.provider = dto.provider
        user.addSociety(dto.societies)
        return user
    }

    addSociety(societies?: Society[] | SocietyDTO[]): this {
        if (!societies) return this
        societies?.forEach((s) => {
            const societyAux = s instanceof Society ? s : Society.fromDTO(s)
            const existe: Society | undefined = this.societies?.find((society) => society.document.number_document === societyAux.document.number_document)
            if (existe != undefined) {
                console.debug('SG.ADD_SOCIETY:', {societyAux, societyEncontrado: existe})
                throw new AppErrorGeneric(StatusCodeResponse.BAD_REQUEST, 'La sociedad ya existe')
            }
            this.societies.push(societyAux)
        })
        return this
    }

    removeSociety(societyId: string): this {
        this.societies = this.societies.filter((s) => s.id !== societyId)
        return this
    }

    findAdvance(advanceId: string): Advance | undefined {
        const society = this.societies.find((s) => s.advances.find((a) => a.id === advanceId))
        return society?.advances.find((a) => a.id === advanceId)
    }
}
