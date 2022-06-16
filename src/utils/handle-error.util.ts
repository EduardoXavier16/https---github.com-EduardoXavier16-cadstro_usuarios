import { UnprocessableEntityException } from '@nestjs/common';

export function handleError(error: Error): undefined {
  const errorLines = error.message?.split('\n');
  const lestErrorLine = errorLines[errorLines.length - 1]?.trim();
  if (!lestErrorLine) {
    console.error(error);
  }
  throw new UnprocessableEntityException(
    lestErrorLine || 'Algum erro ocorreu ao executar a operação!',
  );
}
