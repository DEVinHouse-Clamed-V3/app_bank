import { formatCpf } from "../src/utils/formatCpf";

describe("Teste da função formatCpf", () => {
    
  test("Deve retornar o cpf formatado corretamente", () => {
    const cpf = "99999999999";
    expect(formatCpf(cpf)).toBe("999.999.999-99");
  });

  test("Deve retornar o cpf formatado parcialmente", () => {
    const cpfParcial = "0788978";
    expect(formatCpf(cpfParcial)).toBe("078.897.8");
  });

  test("Deve retornar o cpf invalido", () => {
    const cpfInvalido = "123456789101020";
    expect(formatCpf(cpfInvalido)).toBe("123.456.789-10");
  });

  test("Deve retornar o cpf vazio", () => {
    const cpfVazio = "";
    expect(formatCpf(cpfVazio)).toBe("");
  });

  test("Deve retornar o cpf com caracteres especiais", () => {
    const cpfComCaracteresEspeciais = "123.456.789-00";
    expect(formatCpf(cpfComCaracteresEspeciais)).toBe("123.456.789-00");
  });
  
});
