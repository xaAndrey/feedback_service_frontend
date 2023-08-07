import { RegistrationDto, UpdateRegistrationDto } from "./dto";
import { HttpClient } from "../../ky/HttpClient";
import { PaginationResponse } from "../PaginationResponse";
export const fetchAllRegistration = async (page: number, size: number): Promise<PaginationResponse<RegistrationDto>> => {
  try {
    const response = await HttpClient.get(`registrations?page=${page}&size=${size}`);
    if (!response.ok) {
      throw new Error("провал с извлечением");
    }
    return await response.json();
  } catch (error) {
    throw new Error("провал с извлечением");
  }
};

export const fetchRegistrationById = async (id: number): Promise<RegistrationDto> => {
  try {
    const response = await HttpClient.get('registrations/registration/${id}');
    if (!response.ok) {
      throw new Error("Провал с гетом по айди");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Провал с гетом по айди");
  }
};
export const updateRegistration = async (id: number, dto: UpdateRegistrationDto): Promise<Response> => {
  return HttpClient.put(`registrations/registration/${id}`, {json: dto});
};