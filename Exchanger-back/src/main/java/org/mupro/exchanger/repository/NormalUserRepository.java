package org.mupro.exchanger.repository;

import org.mupro.exchanger.model.NormalUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NormalUserRepository extends JpaRepository<NormalUser, Integer> {
    void deleteNormalUserById(int id);
}
