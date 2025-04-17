package org.mupro.exchanger.repository;

import org.mupro.exchanger.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {
    void deleteAdminById(int id);
}
