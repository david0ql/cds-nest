import {
  IsBoolean,
  IsEmail,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateIdeaDto {
  @IsString()
  @MinLength(8)
  nombre_idea: string;

  @IsString()
  @IsEmail()
  @MinLength(8)
  azure_docente_correo: string;

  @IsPositive()
  @Min(1)
  id_tipo_idea: number;

  @IsBoolean()
  aprovado: boolean;
}
